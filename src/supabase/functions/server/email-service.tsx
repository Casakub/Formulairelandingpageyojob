import * as kv from './kv_store.tsx';
import { getSMTPConfig, getComplianceSettings } from './settings.tsx';
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.13";

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
  // Optionnel: provider HTTP (ex: sendgrid/mailgun)
  provider?: 'smtp' | 'sendgrid' | 'mailgun';
  provider_api_key?: string;
  provider_domain?: string;
  reply_to?: string;
}

// Helper pour obtenir le client Supabase
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

let emailLogsDbReady: boolean | null = null;

async function isEmailLogsDbReady(supabase: any): Promise<boolean> {
  if (emailLogsDbReady !== null) return emailLogsDbReady;

  try {
    const { error } = await supabase
      .from("email_logs")
      .select("id")
      .limit(1);

    if (error) {
      const message = (error as any)?.message || "";
      const code = (error as any)?.code || "";
      if (
        code === "PGRST205" ||
        message.includes("schema cache") ||
        message.includes("does not exist") ||
        message.includes("relation")
      ) {
        emailLogsDbReady = false;
        return false;
      }
      console.error("Email logs DB check failed:", error);
      emailLogsDbReady = false;
      return false;
    }

    emailLogsDbReady = true;
    return true;
  } catch (err) {
    console.error("Email logs DB check error:", err);
    emailLogsDbReady = false;
    return false;
  }
}

/**
 * Service d'envoi d'emails via SMTP
 * 
 * NOTE: Cette implémentation est une simulation. Dans un environnement de production,
 * vous devriez utiliser une bibliothèque comme nodemailer ou un service tiers
 * comme SendGrid, AWS SES, Mailgun, etc.
 */
export class EmailService {
  private config: SMTPConfig | null = null;

  /**
   * Charge la configuration SMTP depuis le KV store
   */
  async loadConfig(): Promise<SMTPConfig | null> {
    try {
      this.config = await getSMTPConfig();
      return this.config;
    } catch (error) {
      console.error('Erreur chargement config SMTP:', error);
      return null;
    }
  }

  /**
   * Vérifie si le service est configuré
   */
  isConfigured(): boolean {
    if (!this.config) return false;
    const provider = this.config.provider || 'smtp';

    if (provider === 'sendgrid') {
      return !!(this.config.provider_api_key && this.config.from_email);
    }

    if (provider === 'mailgun') {
      return !!(this.config.provider_api_key && this.config.provider_domain && this.config.from_email);
    }

    return !!(
      this.config.host &&
      this.config.username &&
      this.config.password &&
      this.config.from_email
    );
  }

  /**
   * Envoie un email
   * 
   * @param options Options de l'email (to, subject, body, html)
   * @returns Promise<{success: boolean, message: string, messageId?: string}>
   */
  async sendEmail(options: EmailOptions): Promise<{
    success: boolean;
    message: string;
    messageId?: string;
  }> {
    // Charger la config si nécessaire
    if (!this.config) {
      await this.loadConfig();
    }

    // Vérifier que le service est configuré
    if (!this.isConfigured()) {
      console.error('❌ Service SMTP non configuré');
      return {
        success: false,
        message: 'Service SMTP non configuré. Configurez SMTP dans les paramètres.',
      };
    }

    return await sendEmailWithConfig(this.config!, options);
  }

  /**
   * Envoie plusieurs emails en lot
   */
  async sendBatch(emails: EmailOptions[]): Promise<{
    success: boolean;
    sent: number;
    failed: number;
    results: Array<{ email: string; success: boolean; message: string }>;
  }> {
    const results = [];
    let sent = 0;
    let failed = 0;

    for (const email of emails) {
      const result = await this.sendEmail(email);
      
      if (result.success) {
        sent++;
      } else {
        failed++;
      }

      results.push({
        email: email.to,
        success: result.success,
        message: result.message,
      });

      // Petit délai entre chaque email pour éviter le rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return {
      success: sent > 0,
      sent,
      failed,
      results,
    };
  }

  /**
   * Enregistre l'historique des emails envoyés
   */
  private async logSentEmail(log: any): Promise<void> {
    await logEmailResult(log);
  }

  /**
   * Récupère l'historique des emails envoyés
   */
  async getEmailLogs(limit: number = 50): Promise<any[]> {
    try {
      try {
        const supabase = getSupabaseClient();
        const dbReady = await isEmailLogsDbReady(supabase);

        if (dbReady) {
          const { data, error } = await supabase
            .from("email_logs")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(limit);

          if (!error && data) {
            return data;
          }
        }
      } catch (err) {
        console.error("Error fetching email logs from DB:", err);
      }

      const logs = await kv.getByPrefix('email_log:');
      return logs
        .sort((a, b) => new Date(b.value.timestamp).getTime() - new Date(a.value.timestamp).getTime())
        .slice(0, limit)
        .map(log => log.value);
    } catch (error) {
      console.error('Erreur récupération logs:', error);
      return [];
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();

/**
 * Envoi réel d'email avec une config fournie (SMTP ou provider HTTP)
 */
export async function sendEmailWithConfig(
  config: SMTPConfig,
  options: EmailOptions
): Promise<{ success: boolean; message: string; messageId?: string }> {
  try {
    const compliance = await getComplianceSettings();
    const shouldAddUnsubscribe = !compliance || compliance.unsubscribe_link !== false;

    const htmlBody = options.html || options.body;
    const finalHtml = shouldAddUnsubscribe ? addUnsubscribeLink(htmlBody, options.to) : htmlBody;
    const finalText = shouldAddUnsubscribe
      ? `${options.body}\n\n---\nSe désinscrire: https://app.yojob.com/unsubscribe?email=${encodeURIComponent(options.to)}`
      : options.body;

    if (config.provider === 'sendgrid') {
      if (!config.provider_api_key) {
        throw new Error('Clé API SendGrid manquante');
      }
      return await sendViaSendGrid(config, options, finalText, finalHtml);
    }

    if (config.provider === 'mailgun') {
      if (!config.provider_api_key || !config.provider_domain) {
        throw new Error('Clé API ou domaine Mailgun manquant');
      }
      return await sendViaMailgun(config, options, finalText, finalHtml);
    }

    if (!config.host || !config.username || !config.password) {
      throw new Error('Configuration SMTP incomplète');
    }

    return await sendViaSMTP(config, options, finalText, finalHtml);
  } catch (error: any) {
    console.error('❌ Erreur envoi email:', error);
    await logEmailResult({
      messageId: `error-${Date.now()}`,
      to: options.to,
      subject: options.subject,
      body: options.body,
      timestamp: new Date().toISOString(),
      status: 'failed',
      provider: config.provider || 'smtp',
      error: error.message,
    });
    return {
      success: false,
      message: `Erreur d'envoi: ${error.message}`,
    };
  }
}

async function sendViaSMTP(
  config: SMTPConfig,
  options: EmailOptions,
  textBody: string,
  htmlBody: string
): Promise<{ success: boolean; message: string; messageId?: string }> {
  const port = Number(config.port) || 587;
  const secure = typeof config.secure === 'boolean' ? config.secure : port === 465;

  console.log('📧 Envoi email via SMTP:', {
    from: `${config.from_name} <${config.from_email}>`,
    to: options.to,
    subject: options.subject,
    host: config.host,
    port,
    secure,
  });

  const baseTransportOptions: any = {
    host: config.host,
    port,
    secure,
    auth: {
      user: config.username,
      pass: config.password,
    },
  };

  const sendWithTransport = async (transportOptions: any) => {
    const transporter = nodemailer.createTransport(transportOptions);
    return await transporter.sendMail({
      from: `${config.from_name} <${config.from_email}>`,
      to: options.to,
      ...(options.cc ? { cc: options.cc } : {}),
      ...(options.bcc ? { bcc: options.bcc } : {}),
      subject: options.subject,
      text: textBody,
      html: htmlBody,
      replyTo: options.replyTo || config.reply_to,
    });
  };

  let info;
  try {
    info = await sendWithTransport(baseTransportOptions);
  } catch (error) {
    const shouldRetryWithStartTls = secure && (port === 587 || port === 25);
    if (shouldRetryWithStartTls) {
      console.warn('⚠️ SMTP TLS direct échoué, tentative STARTTLS...');
      info = await sendWithTransport({
        ...baseTransportOptions,
        secure: false,
        requireTLS: true,
      });
    } else {
      throw error;
    }
  }

  const messageId = info?.messageId || `<${Date.now()}.${Math.random().toString(36).slice(2)}@yojob.com>`;
  await logEmailResult({
    messageId,
    to: options.to,
    subject: options.subject,
    body: textBody,
    timestamp: new Date().toISOString(),
    status: 'sent',
    provider: config.provider || 'smtp',
  });

  return {
    success: true,
    message: 'Email envoyé avec succès',
    messageId,
  };
}

async function sendViaSendGrid(
  config: SMTPConfig,
  options: EmailOptions,
  textBody: string,
  htmlBody: string
): Promise<{ success: boolean; message: string; messageId?: string }> {
  const toList = [options.to];
  const ccList = options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]) : [];
  const bccList = options.bcc ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]) : [];

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.provider_api_key}`,
    },
    body: JSON.stringify({
      personalizations: [{
        to: toList.map((email) => ({ email })),
        ...(ccList.length ? { cc: ccList.map((email) => ({ email })) } : {}),
        ...(bccList.length ? { bcc: bccList.map((email) => ({ email })) } : {}),
      }],
      from: { email: config.from_email, name: config.from_name },
      ...((options.replyTo || config.reply_to) ? { reply_to: { email: options.replyTo || config.reply_to } } : {}),
      subject: options.subject,
      content: [
        { type: "text/plain", value: textBody },
        { type: "text/html", value: htmlBody },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid error: ${response.status} - ${errorText}`);
  }

  const messageId = `<sg.${Date.now()}.${Math.random().toString(36).slice(2)}@yojob.com>`;
  await logEmailResult({
    messageId,
    to: options.to,
    subject: options.subject,
    body: textBody,
    timestamp: new Date().toISOString(),
    status: 'sent',
    provider: 'sendgrid',
  });

  return {
    success: true,
    message: 'Email envoyé avec succès (SendGrid)',
    messageId,
  };
}

async function sendViaMailgun(
  config: SMTPConfig,
  options: EmailOptions,
  textBody: string,
  htmlBody: string
): Promise<{ success: boolean; message: string; messageId?: string }> {
  const url = `https://api.mailgun.net/v3/${config.provider_domain}/messages`;
  const form = new URLSearchParams();
  form.set("from", `${config.from_name} <${config.from_email}>`);
  form.set("to", options.to);
  if (options.cc) {
    form.set("cc", Array.isArray(options.cc) ? options.cc.join(",") : options.cc);
  }
  if (options.bcc) {
    form.set("bcc", Array.isArray(options.bcc) ? options.bcc.join(",") : options.bcc);
  }
  form.set("subject", options.subject);
  form.set("text", textBody);
  form.set("html", htmlBody);
  if (options.replyTo || config.reply_to) {
    form.set("h:Reply-To", options.replyTo || config.reply_to);
  }

  const auth = btoa(`api:${config.provider_api_key}`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailgun error: ${response.status} - ${errorText}`);
  }

  const messageId = `<mg.${Date.now()}.${Math.random().toString(36).slice(2)}@yojob.com>`;
  await logEmailResult({
    messageId,
    to: options.to,
    subject: options.subject,
    body: textBody,
    timestamp: new Date().toISOString(),
    status: 'sent',
    provider: 'mailgun',
  });

  return {
    success: true,
    message: 'Email envoyé avec succès (Mailgun)',
    messageId,
  };
}

async function logEmailResult(log: any): Promise<void> {
  try {
    try {
      const supabase = getSupabaseClient();
      const dbReady = await isEmailLogsDbReady(supabase);

      if (dbReady) {
        await supabase
          .from("email_logs")
          .insert([{
            message_id: log.messageId,
            to_email: log.to,
            subject: log.subject,
            body: log.body,
            status: log.status,
            provider: log.provider || 'smtp',
            error: log.error || null,
            metadata: log.metadata || {},
            created_at: log.timestamp || new Date().toISOString(),
          }]);
        return;
      }
    } catch (dbError) {
      console.error('Erreur log email (DB):', dbError);
    }

    const key = `email_log:${log.messageId}`;
    await kv.set(key, log);
  } catch (error) {
    console.error('Erreur log email:', error);
  }
}

/**
 * Helper pour envoyer un email de template
 */
export async function sendTemplateEmail(
  to: string,
  templateName: string,
  variables: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  try {
    // Récupérer le template
    const template = await kv.get(`email_template:${templateName}`);
    
    if (!template) {
      return {
        success: false,
        message: `Template "${templateName}" introuvable`,
      };
    }

    // Remplacer les variables dans le template
    let subject = (template as any).subject;
    let body = (template as any).body;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), value);
      body = body.replace(new RegExp(placeholder, 'g'), value);
    }

    // Envoyer l'email
    return await emailService.sendEmail({
      to,
      subject,
      body,
    });
  } catch (error: any) {
    console.error('Erreur envoi template email:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Helper pour ajouter le lien de désinscription automatiquement
 */
export function addUnsubscribeLink(body: string, prospectEmail: string): string {
  const unsubscribeUrl = `https://app.yojob.com/unsubscribe?email=${encodeURIComponent(prospectEmail)}`;
  
  return `${body}\n\n---\n\n<p style="font-size: 11px; color: #888;">
    Vous recevez cet email car vous avez interagi avec YOJOB.
    <a href="${unsubscribeUrl}" style="color: #888; text-decoration: underline;">Se désinscrire</a>
  </p>`;
}
