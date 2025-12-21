import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const devis = new Hono();

/**
 * Génère un numéro de devis unique
 */
function genererNumeroDevis(): string {
  const date = new Date();
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  return `DEV-${annee}${mois}${jour}-${random}`;
}

/**
 * POST /make-server-10092a63/devis
 * Créer une nouvelle demande de devis
 */
devis.post('/', async (c) => {
  try {
    const data = await c.req.json();
    
    // Générer un ID et numéro unique
    const id = crypto.randomUUID();
    const numero = genererNumeroDevis();
    const timestamp = new Date().toISOString();
    
    // Créer l'objet prospect/devis
    const prospect = {
      id,
      numero,
      type: 'devis',
      statut: 'nouveau',
      createdAt: timestamp,
      updatedAt: timestamp,
      
      // Informations entreprise
      entreprise: {
        raisonSociale: data.entreprise.raisonSociale,
        siret: data.entreprise.siret,
        codeAPE: data.entreprise.codeAPE,
        tvaIntracommunautaire: data.entreprise.tvaIntracommunautaire,
        adresse: data.entreprise.adresse,
        codePostal: data.entreprise.codePostal,
        ville: data.entreprise.ville,
        region: data.entreprise.region,
        siteInternet: data.entreprise.siteInternet
      },
      
      // Contact
      contact: {
        nom: data.contact.nom,
        prenom: data.contact.prenom,
        fonction: data.contact.fonction,
        email: data.contact.email,
        telephoneFixe: data.contact.telephoneFixe,
        telephonePortable: data.contact.telephonePortable
      },
      
      // Besoins (postes)
      postes: data.postes,
      
      // Conditions
      conditions: data.conditions,
      
      // Profil candidats
      candidats: data.candidats,
      
      // Métadonnées
      metadata: {
        source: 'formulaire-web',
        userAgent: c.req.header('user-agent'),
        ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip')
      }
    };
    
    // Sauvegarder dans le KV store
    await kv.set(`prospects:${id}`, prospect);
    
    // Ajouter à la liste des prospects
    const listeProspects = await kv.get('prospects:list') || [];
    listeProspects.unshift(id); // Ajouter au début
    await kv.set('prospects:list', listeProspects);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {
      total: 0,
      nouveau: 0,
      enCours: 0,
      devisEnvoye: 0,
      converti: 0,
      perdu: 0
    };
    stats.total += 1;
    stats.nouveau += 1;
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis créé: ${numero} (ID: ${id})`);
    
    return c.json({
      success: true,
      id,
      numero,
      message: 'Demande de devis enregistrée avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur création devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la création du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis
 * Lister tous les devis/prospects
 */
devis.get('/', async (c) => {
  try {
    const listeIds = await kv.get('prospects:list') || [];
    
    if (listeIds.length === 0) {
      return c.json({
        success: true,
        data: [],
        total: 0
      });
    }
    
    // Récupérer tous les prospects
    const prospects = await kv.mget(listeIds.map(id => `prospects:${id}`));
    
    // Filtrer les null (prospects supprimés)
    const prospectsFiltres = prospects.filter(p => p !== null);
    
    return c.json({
      success: true,
      data: prospectsFiltres,
      total: prospectsFiltres.length
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis/:id
 * Récupérer un devis spécifique
 */
devis.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    return c.json({
      success: true,
      data: prospect
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * PATCH /make-server-10092a63/devis/:id
 * Mettre à jour un devis (statut, notes, etc.)
 */
devis.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Mettre à jour le statut si fourni
    if (updates.statut && prospect.statut !== updates.statut) {
      // Mettre à jour les stats
      const stats = await kv.get('prospects:stats') || {};
      if (stats[prospect.statut]) stats[prospect.statut] -= 1;
      if (stats[updates.statut]) stats[updates.statut] += 1;
      await kv.set('prospects:stats', stats);
    }
    
    // Fusionner les mises à jour
    const prospectMisAJour = {
      ...prospect,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`prospects:${id}`, prospectMisAJour);
    
    console.log(`✅ Devis mis à jour: ${id}`);
    
    return c.json({
      success: true,
      data: prospectMisAJour
    });
    
  } catch (error) {
    console.error('❌ Erreur mise à jour devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * DELETE /make-server-10092a63/devis/:id
 * Supprimer un devis
 */
devis.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Supprimer de la liste
    const listeIds = await kv.get('prospects:list') || [];
    const nouvelleListe = listeIds.filter(i => i !== id);
    await kv.set('prospects:list', nouvelleListe);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats.total) stats.total -= 1;
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    await kv.set('prospects:stats', stats);
    
    // Supprimer le prospect
    await kv.del(`prospects:${id}`);
    
    console.log(`✅ Devis supprimé: ${id}`);
    
    return c.json({
      success: true,
      message: 'Devis supprimé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur suppression devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis/stats
 * Récupérer les statistiques
 */
devis.get('/api/stats', async (c) => {
  try {
    const stats = await kv.get('prospects:stats') || {
      total: 0,
      nouveau: 0,
      enCours: 0,
      devisEnvoye: 0,
      converti: 0,
      perdu: 0
    };
    
    return c.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération stats:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des statistiques',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/generer-pdf
 * Générer un PDF pour un devis
 */
devis.post('/generer-pdf', async (c) => {
  try {
    const { devisId, inclureCGV } = await c.req.json();
    
    console.log(`📄 Génération PDF pour devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // TODO: Implémenter la génération PDF réelle avec react-pdf
    // Pour l'instant, on retourne un placeholder
    
    const pdfData = {
      id: crypto.randomUUID(),
      devisId,
      numero: prospect.numero,
      pdfUrl: '#', // URL temporaire
      statut: 'genere',
      dateGeneration: new Date().toISOString(),
      inclureCGV
    };
    
    // Sauvegarder les métadonnées du PDF
    await kv.set(`pdf:${pdfData.id}`, pdfData);
    
    console.log(`✅ PDF généré: ${pdfData.id}`);
    
    return c.json({
      success: true,
      pdfUrl: pdfData.pdfUrl,
      pdfId: pdfData.id,
      message: 'PDF généré avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur génération PDF:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la génération du PDF',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/devis/signer-devis
 * Signer un devis électroniquement avec certification complète
 */
devis.post('/signer-devis', async (c) => {
  try {
    const { 
      devisId, 
      signatureBase64, 
      accepteCGV,
      identiteSignataire // Nouvelles données d'identité
    } = await c.req.json();
    
    if (!accepteCGV) {
      return c.json(
        {
          success: false,
          error: 'Vous devez accepter les CGV'
        },
        400
      );
    }
    
    console.log(`✍️ Signature devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer un hash SHA-256 du contenu du devis pour garantir l'intégrité
    const devisContent = JSON.stringify({
      numero: prospect.numero,
      entreprise: prospect.entreprise,
      contact: prospect.contact,
      postes: prospect.postes,
      conditions: prospect.conditions
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(devisContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Récupérer les métadonnées de la requête
    const ipAddress = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      c.req.header('cf-connecting-ip') || 
                      'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';
    const timestamp = new Date().toISOString();
    
    // Créer le certificat de signature électronique
    const certificatSignature = {
      // Signature graphique
      image: signatureBase64,
      
      // Identité du signataire (certifiée par les données du formulaire)
      signataire: {
        nom: prospect.contact.nom,
        prenom: prospect.contact.prenom,
        email: prospect.contact.email,
        fonction: prospect.contact.fonction,
        entreprise: prospect.entreprise.raisonSociale,
        siret: prospect.entreprise.siret
      },
      
      // Traçabilité technique
      metadata: {
        ipAddress: ipAddress,
        userAgent: userAgent,
        timestamp: timestamp,
        timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Europe/Paris'
        })
      },
      
      // Preuve d'intégrité
      integrite: {
        hashAlgorithm: 'SHA-256',
        documentHash: hashHex,
        devisNumero: prospect.numero,
        devisId: devisId
      },
      
      // Consentement
      consentement: {
        accepteCGV: true,
        dateAcceptation: timestamp,
        mentions: 'Le signataire certifie avoir lu et accepté les Conditions Générales de Vente et que les informations fournies sont exactes. Cette signature électronique a la même valeur légale qu\'une signature manuscrite conformément au règlement eIDAS (UE) n°910/2014.'
      },
      
      // Informations supplémentaires pour la traçabilité
      contexte: identiteSignataire || {}
    };
    
    // Mettre à jour le statut du devis
    const prospectMisAJour = {
      ...prospect,
      statut: 'signe',
      signature: certificatSignature,
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    if (stats['signe']) {
      stats['signe'] += 1;
    } else {
      stats['signe'] = 1;
    }
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis signé avec certification complète: ${devisId}`);
    console.log(`📍 IP: ${ipAddress}`);
    console.log(`🔐 Hash: ${hashHex.substring(0, 16)}...`);
    
    // TODO: Envoyer email de confirmation avec certificat
    // TODO: Régénérer le PDF avec la signature et le certificat
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectMisAJour,
      certificat: certificatSignature
    });
    
  } catch (error) {
    console.error('❌ Erreur signature devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la signature du devis',
        details: error.message
      },
      500
    );
  }
});

export default devis;