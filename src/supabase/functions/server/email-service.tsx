import * as kv from './kv_store.tsx';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  html?: string;
}

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
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
      this.config = await kv.get('settings:smtp');
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
    return !!(
      this.config &&
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

    try {
      console.log('📧 Envoi email via SMTP:', {
        from: `${this.config!.from_name} <${this.config!.from_email}>`,
        to: options.to,
        subject: options.subject,
        host: this.config!.host,
        port: this.config!.port,
      });

      // SIMULATION D'ENVOI
      // Dans un vrai système, vous utiliseriez:
      // 1. nodemailer avec SMTP
      // 2. ou un service tiers (SendGrid API, AWS SES SDK, Mailgun API, etc.)
      
      /*
      // Exemple avec nodemailer (non disponible dans Deno par défaut):
      const transporter = nodemailer.createTransport({
        host: this.config!.host,
        port: this.config!.port,
        secure: this.config!.secure,
        auth: {
          user: this.config!.username,
          pass: this.config!.password,
        },
      });

      const info = await transporter.sendMail({
        from: `${this.config!.from_name} <${this.config!.from_email}>`,
        to: options.to,
        subject: options.subject,
        text: options.body,
        html: options.html || options.body,
      });

      return {
        success: true,
        message: 'Email envoyé avec succès',
        messageId: info.messageId,
      };
      */

      // SIMULATION POUR LE DÉVELOPPEMENT
      const messageId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@yojob.com>`;
      
      // Log l'email envoyé (pour debug)
      await this.logSentEmail({
        messageId,
        to: options.to,
        subject: options.subject,
        body: options.body,
        timestamp: new Date().toISOString(),
        status: 'sent',
      });

      console.log('✅ Email simulé envoyé avec succès:', messageId);

      return {
        success: true,
        message: 'Email envoyé avec succès (simulé)',
        messageId,
      };
    } catch (error: any) {
      console.error('❌ Erreur envoi email:', error);
      
      // Log l'erreur
      await this.logSentEmail({
        messageId: `error-${Date.now()}`,
        to: options.to,
        subject: options.subject,
        body: options.body,
        timestamp: new Date().toISOString(),
        status: 'failed',
        error: error.message,
      });

      return {
        success: false,
        message: `Erreur d'envoi: ${error.message}`,
      };
    }
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
    try {
      const key = `email_log:${log.messageId}`;
      await kv.set(key, log);
    } catch (error) {
      console.error('Erreur log email:', error);
    }
  }

  /**
   * Récupère l'historique des emails envoyés
   */
  async getEmailLogs(limit: number = 50): Promise<any[]> {
    try {
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
