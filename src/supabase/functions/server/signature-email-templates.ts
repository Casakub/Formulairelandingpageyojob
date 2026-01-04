// 🆕 TEMPLATES D'EMAILS POUR SIGNATURE EN LIGNE
// Ce fichier contient les 4 templates d'automatisation de signature

export const SIGNATURE_EMAIL_TEMPLATES = [
  {
    id: 'tpl-signature-link',
    name: 'Devis - Envoi lien signature',
    description: 'Email automatique envoyé avec le lien de signature sécurisé',
    subject: '✍️ {{company}} - Votre devis {{quote_number}} est prêt à signer',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <!-- Header avec logo et gradient -->
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📋 Votre devis est prêt !</h1>
          <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Signature électronique en 2 clics</p>
        </div>
        
        <!-- Corps du message -->
        <div style="background: white; padding: 40px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">
            Bonjour <strong>{{contact_firstname}} {{contact_lastname}}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #334155; line-height: 1.6;">
            Votre devis <strong>{{quote_number}}</strong> pour <strong>{{company}}</strong> 
            est maintenant finalisé et prêt pour signature électronique.
          </p>
          
          <!-- Récapitulatif rapide -->
          <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #1E3A8A; margin: 0 0 15px 0; font-size: 18px;">📊 Récapitulatif</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Postes à pourvoir :</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">{{positions_count}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Candidats recherchés :</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">{{candidates_count}}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Secteur :</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold; text-align: right;">{{sector}}</td>
              </tr>
            </table>
          </div>
          
          <!-- CTA Principal -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="{{signature_url}}" 
               style="background: linear-gradient(135deg, #10B981, #059669); 
                      color: white; 
                      padding: 18px 40px; 
                      text-decoration: none; 
                      border-radius: 30px; 
                      font-weight: bold; 
                      font-size: 18px;
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
              ✍️ Signer mon devis maintenant
            </a>
          </div>
          
          <!-- Sécurité et confiance -->
          <div style="background: #ecfdf5; border-left: 4px solid #10B981; padding: 20px; margin: 30px 0; border-radius: 8px;">
            <h4 style="color: #047857; margin: 0 0 10px 0; font-size: 16px;">🔐 Signature 100% sécurisée</h4>
            <ul style="margin: 0; padding-left: 20px; color: #065f46; font-size: 14px; line-height: 1.8;">
              <li>Signature électronique conforme <strong>eIDAS (UE)</strong></li>
              <li>Même valeur légale qu'une signature manuscrite</li>
              <li>Certificat horodaté automatiquement généré</li>
              <li>Lien valide pendant <strong>30 jours</strong></li>
            </ul>
          </div>
          
          <!-- Contact -->
          <div style="border-top: 2px solid #e2e8f0; padding-top: 25px; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 15px 0;">
              <strong style="color: #1e293b;">Une question ?</strong> Notre équipe est à votre disposition.
            </p>
            <p style="color: #475569; font-size: 14px; margin: 0;">
              📞 <a href="tel:+33123456789" style="color: #06B6D4; text-decoration: none;">+33 1 23 45 67 89</a><br>
              ✉️ <a href="mailto:contact@yojob.com" style="color: #06B6D4; text-decoration: none;">contact@yojob.com</a>
            </p>
          </div>
          
          <!-- Signature -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #1e293b; margin: 0; font-size: 15px;">
              Cordialement,<br>
              <strong>L'équipe YOJOB</strong><br>
              <span style="color: #06B6D4; font-size: 13px;">🌍 Leader du recrutement européen</span>
            </p>
          </div>
        </div>
      </div>
    `,
    body_text: `Bonjour {{contact_firstname}} {{contact_lastname}},

Votre devis {{quote_number}} pour {{company}} est prêt pour signature électronique.

🔗 Signez votre devis : {{signature_url}}

Récapitulatif :
- Postes : {{positions_count}}
- Candidats : {{candidates_count}}
- Secteur : {{sector}}

🔐 Signature 100% sécurisée (conforme eIDAS UE)
⏰ Lien valide 30 jours

Questions ? 📞 +33 1 23 45 67 89

Cordialement,
L'équipe YOJOB`,
    variables: [
      '{{contact_firstname}}',
      '{{contact_lastname}}',
      '{{company}}',
      '{{quote_number}}',
      '{{signature_url}}',
      '{{positions_count}}',
      '{{candidates_count}}',
      '{{sector}}'
    ],
    category: 'signature',
    language: 'fr',
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    usage_count: 0,
  },
  {
    id: 'tpl-signature-reminder-j2',
    name: 'Devis - Relance signature J+2',
    description: 'Email de relance automatique 2 jours après envoi du lien si non signé',
    subject: '⏰ {{contact_firstname}}, votre devis {{quote_number}} attend votre signature',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">
            Bonjour <strong>{{contact_firstname}}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #334155; line-height: 1.6;">
            Je me permets de revenir vers vous concernant votre devis 
            <strong>{{quote_number}}</strong> envoyé il y a 2 jours.
          </p>
          
          <!-- Alerte urgence douce -->
          <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 20px; margin: 25px 0; border-radius: 8px;">
            <p style="color: #92400E; margin: 0; font-size: 15px;">
              <strong>💡 Rappel :</strong> Pour garantir la disponibilité de nos candidats, 
              nous vous recommandons de valider votre devis rapidement.
            </p>
          </div>
          
          <!-- Récap simplifié -->
          <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">Votre recherche :</p>
            <p style="margin: 0; color: #1e293b; font-size: 16px;">
              <strong>{{candidates_count}} candidat(s)</strong> • {{sector}} • {{country}}
            </p>
          </div>
          
          <!-- CTA -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="{{signature_url}}" 
               style="background: linear-gradient(135deg, #7C3AED, #6D28D9); 
                      color: white; 
                      padding: 18px 40px; 
                      text-decoration: none; 
                      border-radius: 30px; 
                      font-weight: bold; 
                      font-size: 18px;
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);">
              ✍️ Finaliser ma demande
            </a>
          </div>
          
          <!-- Contact -->
          <div style="border-top: 2px solid #e2e8f0; padding-top: 25px; margin-top: 30px;">
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              <strong>Des questions ?</strong><br>
              Appelez-moi directement au <a href="tel:+33123456789" style="color: #06B6D4; text-decoration: none; font-weight: bold;">+33 1 23 45 67 89</a>
            </p>
          </div>
          
          <div style="margin-top: 30px;">
            <p style="color: #1e293b; margin: 0; font-size: 15px;">
              Bien cordialement,<br>
              <strong>L'équipe YOJOB</strong>
            </p>
          </div>
        </div>
      </div>
    `,
    body_text: `Bonjour {{contact_firstname}},

Je reviens vers vous concernant votre devis {{quote_number}} envoyé il y a 2 jours.

💡 Rappel : Pour garantir la disponibilité de nos candidats, validez rapidement.

Votre recherche : {{candidates_count}} candidat(s) • {{sector}} • {{country}}

🔗 Finaliser maintenant : {{signature_url}}

Questions ? 📞 +33 1 23 45 67 89

Cordialement,
L'équipe YOJOB`,
    variables: [
      '{{contact_firstname}}',
      '{{quote_number}}',
      '{{signature_url}}',
      '{{candidates_count}}',
      '{{sector}}',
      '{{country}}'
    ],
    category: 'signature',
    language: 'fr',
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    usage_count: 0,
  },
  {
    id: 'tpl-signature-reminder-j7',
    name: 'Devis - Relance signature J+7',
    description: 'Email de relance urgente 7 jours après si toujours non signé',
    subject: '🚨 {{contact_firstname}}, dernier rappel pour votre devis {{quote_number}}',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">
            Bonjour <strong>{{contact_firstname}}</strong>,
          </p>
          
          <!-- Alerte urgence forte -->
          <div style="background: linear-gradient(135deg, #EF4444, #DC2626); padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 20px;">⏰ DERNIER RAPPEL</h3>
            <p style="color: #FEE2E2; margin: 0; font-size: 15px;">
              Votre devis <strong>{{quote_number}}</strong> expire dans <strong>48 heures</strong>.
            </p>
          </div>
          
          <p style="font-size: 16px; color: #334155; line-height: 1.6;">
            Sans retour de votre part, nous serons contraints de libérer les ressources 
            actuellement réservées pour votre projet.
          </p>
          
          <!-- CTA urgent -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="{{signature_url}}" 
               style="background: linear-gradient(135deg, #EF4444, #DC2626); 
                      color: white; 
                      padding: 18px 40px; 
                      text-decoration: none; 
                      border-radius: 30px; 
                      font-weight: bold; 
                      font-size: 18px;
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);">
              🚀 Je valide immédiatement
            </a>
          </div>
          
          <!-- Alternative téléphone -->
          <div style="background: #FEF3C7; border: 2px solid #F59E0B; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <h4 style="color: #92400E; margin: 0 0 10px 0; font-size: 16px;">📞 Vous préférez en parler ?</h4>
            <p style="color: #78350F; margin: 0; font-size: 14px;">
              Contactez-nous <strong>maintenant</strong> : 
              <a href="tel:+33123456789" style="color: #92400E; font-weight: bold; font-size: 18px;">+33 1 23 45 67 89</a>
            </p>
          </div>
          
          <div style="margin-top: 30px;">
            <p style="color: #1e293b; margin: 0; font-size: 15px;">
              Dans l'attente de votre retour,<br>
              <strong>L'équipe YOJOB</strong>
            </p>
          </div>
        </div>
      </div>
    `,
    body_text: `Bonjour {{contact_firstname}},

⏰ DERNIER RAPPEL
Votre devis {{quote_number}} expire dans 48 heures.

🔗 Valider maintenant : {{signature_url}}
📞 Ou appelez-nous : +33 1 23 45 67 89

L'équipe YOJOB`,
    variables: [
      '{{contact_firstname}}',
      '{{quote_number}}',
      '{{signature_url}}'
    ],
    category: 'signature',
    language: 'fr',
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    usage_count: 0,
  },
  {
    id: 'tpl-signature-confirmed',
    name: 'Devis - Confirmation signature',
    description: 'Email de confirmation envoyé immédiatement après signature du devis',
    subject: '✅ {{contact_firstname}}, votre devis {{quote_number}} est signé !',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <!-- Header succès -->
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px; border-radius: 15px 15px 0 0; text-align: center;">
          <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
          <h1 style="color: white; margin: 0; font-size: 28px;">Devis signé avec succès !</h1>
          <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Votre demande est activée</p>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">
            Bonjour <strong>{{contact_firstname}} {{contact_lastname}}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #334155; line-height: 1.6;">
            Félicitations ! Votre devis <strong>{{quote_number}}</strong> a été signé avec succès 
            le <strong>{{signature_date}}</strong>.
          </p>
          
          <!-- Certificat -->
          <div style="background: #ecfdf5; border: 2px solid #10B981; padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #047857; margin: 0 0 15px 0; font-size: 18px;">🔐 Certificat de signature électronique</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; color: #064e3b; font-size: 14px;">N° de devis :</td>
                <td style="padding: 5px 0; color: #047857; font-weight: bold; text-align: right;">{{quote_number}}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #064e3b; font-size: 14px;">Date et heure :</td>
                <td style="padding: 5px 0; color: #047857; font-weight: bold; text-align: right;">{{signature_date}}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #064e3b; font-size: 14px;">Conformité :</td>
                <td style="padding: 5px 0; color: #047857; font-weight: bold; text-align: right;">eIDAS (UE) n°910/2014</td>
              </tr>
            </table>
          </div>
          
          <!-- Prochaines étapes -->
          <div style="margin: 30px 0;">
            <h3 style="color: #1E3A8A; margin: 0 0 20px 0; font-size: 20px;">📅 Prochaines étapes</h3>
            <div style="padding-left: 20px; border-left: 3px solid #06B6D4; margin-bottom: 15px;">
              <h4 style="margin: 0 0 5px 0; color: #1e293b;">1. ✅ Activation immédiate</h4>
              <p style="margin: 0; color: #64748b; font-size: 14px;">Votre demande est maintenant prioritaire</p>
            </div>
            <div style="padding-left: 20px; border-left: 3px solid #06B6D4; margin-bottom: 15px;">
              <h4 style="margin: 0 0 5px 0; color: #1e293b;">2. 🔍 Recherche de candidats (48-72h)</h4>
              <p style="margin: 0; color: #64748b; font-size: 14px;">Notre réseau de 500+ agences est mobilisé</p>
            </div>
            <div style="padding-left: 20px; border-left: 3px solid #06B6D4; margin-bottom: 15px;">
              <h4 style="margin: 0 0 5px 0; color: #1e293b;">3. 👥 Présentation des profils</h4>
              <p style="margin: 0; color: #64748b; font-size: 14px;">Candidats pré-qualifiés avec CV et références</p>
            </div>
            <div style="padding-left: 20px; border-left: 3px solid #06B6D4;">
              <h4 style="margin: 0 0 5px 0; color: #1e293b;">4. 🤝 Accompagnement complet</h4>
              <p style="margin: 0; color: #64748b; font-size: 14px;">De l'entretien à l'embauche</p>
            </div>
          </div>
          
          <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0; text-align: center;">
            <p style="color: #1e293b; margin: 0 0 10px 0; font-size: 18px;">
              <strong>Merci de votre confiance ! 🙏</strong>
            </p>
            <p style="color: #64748b; margin: 0; font-size: 15px;">
              L'équipe YOJOB<br>
              <span style="color: #06B6D4; font-size: 13px;">🌍 Leader du recrutement européen</span>
            </p>
          </div>
        </div>
      </div>
    `,
    body_text: `Bonjour {{contact_firstname}} {{contact_lastname}},

✅ DEVIS SIGNÉ AVEC SUCCÈS !

Votre devis {{quote_number}} a été signé le {{signature_date}}.

🔐 Certificat conforme eIDAS (UE) n°910/2014

📅 PROCHAINES ÉTAPES :
1. ✅ Activation immédiate
2. 🔍 Recherche candidats (48-72h)
3. 👥 Présentation profils qualifiés
4. 🤝 Accompagnement complet

Merci de votre confiance !
L'équipe YOJOB`,
    variables: [
      '{{contact_firstname}}',
      '{{contact_lastname}}',
      '{{quote_number}}',
      '{{signature_date}}'
    ],
    category: 'signature',
    language: 'fr',
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    usage_count: 0,
  },
];
