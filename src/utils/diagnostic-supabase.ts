/**
 * 🔍 DIAGNOSTIC SUPABASE COMPLET
 * 
 * Pour l'utiliser :
 * 1. Ouvrez la console (F12)
 * 2. Tapez : window.diagnosticSupabase()
 * 3. Regardez les résultats dans la console
 */

import { supabase } from '../lib/supabase';

export async function diagnosticSupabase() {
  console.clear();
  console.log('%c🔍 DIAGNOSTIC SUPABASE - DÉBUT', 'background: #4338ca; color: white; font-size: 20px; padding: 10px; font-weight: bold;');
  console.log('');
  
  const results: any = {
    session: null,
    grants: null,
    insert: null,
    analysis: []
  };
  
  // ════════════════════════════════════════════════════════════════
  // 1️⃣ VÉRIFICATION SESSION
  // ════════════════════════════════════════════════════════════════
  console.log('%c1️⃣ VÉRIFICATION SESSION JWT', 'background: #0891b2; color: white; font-size: 16px; padding: 5px; font-weight: bold;');
  
  try {
    const { data: { session } } = await supabase!.auth.getSession();
    
    results.session = {
      hasSession: !!session,
      role: session?.user?.role || 'anon',
      userId: session?.user?.id || 'none',
      accessToken: session?.access_token ? session.access_token.substring(0, 30) + '...' : 'none',
      expiresAt: session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'none',
    };
    
    if (results.session.hasSession) {
      console.log('%c⚠️ UNE SESSION EST ACTIVE !', 'background: #f59e0b; color: white; font-size: 14px; padding: 5px;');
      console.warn('🔴 PROBLÈME DÉTECTÉ: Le client Supabase essaie de s\'authentifier au lieu d\'utiliser le rôle anon');
      console.warn('💡 SOLUTION: Tapez "await supabase.auth.signOut()" puis rechargez la page');
      results.analysis.push('🔴 Session active détectée - C\'est probablement LA cause du problème');
    } else {
      console.log('%c✅ Pas de session active (normal pour formulaire public)', 'color: #10b981; font-weight: bold;');
    }
    
    console.table(results.session);
  } catch (error) {
    console.error('❌ Erreur lors de la vérification session:', error);
    results.session = { error: String(error) };
  }
  
  console.log('');
  
  // ════════════════════════════════════════════════════════════════
  // 2️⃣ TEST SELECT (GRANT READ)
  // ════════════════════════════════════════════════════════════════
  console.log('%c2️⃣ TEST PERMISSION SELECT', 'background: #0891b2; color: white; font-size: 16px; padding: 5px; font-weight: bold;');
  
  try {
    const { data, error } = await supabase!
      .from('market_research_responses')
      .select('id')
      .limit(1);
    
    results.grants = {
      canSelect: !error,
      rowsFound: data?.length || 0,
      error: error ? {
        code: error.code,
        message: error.message,
        details: error.details,
      } : null,
    };
    
    if (error) {
      console.log('%c❌ SELECT ÉCHOUE', 'background: #ef4444; color: white; font-size: 14px; padding: 5px;');
      console.error('Erreur:', error);
      results.analysis.push('❌ Permission SELECT manquante pour le rôle actuel');
    } else {
      console.log('%c✅ SELECT fonctionne', 'color: #10b981; font-weight: bold;');
      console.log(`📊 ${data?.length || 0} lignes trouvées`);
    }
    
    console.table(results.grants);
  } catch (error) {
    console.error('❌ Erreur lors du test SELECT:', error);
    results.grants = { error: String(error) };
  }
  
  console.log('');
  
  // ════════════════════════════════════════════════════════════════
  // 3️⃣ TEST INSERT
  // ════════════════════════════════════════════════════════════════
  console.log('%c3️⃣ TEST PERMISSION INSERT', 'background: #0891b2; color: white; font-size: 16px; padding: 5px; font-weight: bold;');
  
  try {
    const testData = {
      response_id: 'DIAGNOSTIC-TEST-' + Date.now(),
      q1_nom: 'Test Diagnostic',
      q2_annee: '2020',
      q3_taille: '10-50',
      q4_secteurs: ['Test'],
      q5_pays: 'France',
      q6_volume: '50-100',
      q7_origine: 'France',
      q8_destinations: 'Espagne',
      q9_defi: 'Test',
      q9_autre: '',
      q10_gestion: 'Manuel',
      q11_incidents: 'Non',
      q12_budget: '5000',
      q13_manque_gagner: '10000',
      q14_risques: 'Test',
      q15_probleme: 'Test',
      q16_erp: 'Excel',
      q16_autre: '',
      q17_migration: 'Prêt',
      q18_score: 8,
      q19_features: ['Test'],
      q20_prix: 'Mensuel',
      q21_budget_mensuel: '500',
      q22_mvp: 'Oui',
      q23_role: 'Test',
      q24_evolution: 'Test',
      q25_besoins: 'Test',
      email: 'diagnostic@test.com',
      autorise_contact: true,
      souhaite_rapport: true,
    };
    
    const { data, error } = await supabase!
      .from('market_research_responses')
      .insert([testData])
      .select()
      .single();
    
    results.insert = {
      success: !error,
      insertedId: data?.id || null,
      error: error ? {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      } : null,
    };
    
    if (error) {
      console.log('%c❌ INSERT ÉCHOUE', 'background: #ef4444; color: white; font-size: 14px; padding: 5px;');
      console.error('Erreur:', error);
      
      if (error.code === '42501') {
        console.warn('🔴 Code 42501 = Permission denied');
        results.analysis.push('❌ Permission INSERT refusée par Postgres ou RLS');
      }
    } else {
      console.log('%c✅ INSERT FONCTIONNE !', 'background: #10b981; color: white; font-size: 14px; padding: 5px;');
      console.log(`📝 Ligne insérée avec ID: ${data?.id}`);
      results.analysis.push('✅ INSERT fonctionne ! Le problème vient peut-être du formulaire.');
    }
    
    console.table(results.insert);
  } catch (error) {
    console.error('❌ Erreur lors du test INSERT:', error);
    results.insert = { error: String(error) };
  }
  
  console.log('');
  
  // ════════════════════════════════════════════════════════════════
  // 🎯 ANALYSE AUTOMATIQUE
  // ════════════════════════════════════════════════════════════════
  console.log('%c🎯 ANALYSE AUTOMATIQUE', 'background: #7c3aed; color: white; font-size: 16px; padding: 5px; font-weight: bold;');
  
  if (results.session?.hasSession) {
    console.log('%c⚠️ CAUSE PROBABLE #1: Session JWT active', 'background: #f59e0b; color: white; padding: 5px;');
    console.log('Le client essaie de s\'authentifier avec un JWT au lieu d\'utiliser le rôle anon.');
    console.log('');
    console.log('%c💡 SOLUTION:', 'background: #10b981; color: white; padding: 5px;');
    console.log('1. Exécutez: await supabase.auth.signOut()');
    console.log('2. Rechargez la page (F5)');
    console.log('3. Retestez le formulaire');
  } else if (!results.grants?.canSelect) {
    console.log('%c⚠️ CAUSE PROBABLE #2: GRANT SELECT manquant', 'background: #ef4444; color: white; padding: 5px;');
    console.log('Le rôle anon n\'a pas la permission SELECT sur la table.');
    console.log('');
    console.log('%c💡 SOLUTION:', 'background: #10b981; color: white; padding: 5px;');
    console.log('Exécutez dans Supabase SQL Editor:');
    console.log('GRANT SELECT, INSERT ON market_research_responses TO anon;');
  } else if (!results.insert?.success) {
    console.log('%c⚠️ CAUSE PROBABLE #3: GRANT INSERT ou RLS Policy', 'background: #ef4444; color: white; padding: 5px;');
    console.log('SELECT fonctionne mais pas INSERT.');
    console.log('');
    console.log('%c💡 SOLUTION:', 'background: #10b981; color: white; padding: 5px;');
    console.log('Exécutez dans Supabase SQL Editor:');
    console.log('GRANT INSERT ON market_research_responses TO anon;');
    console.log('');
    console.log('Et vérifiez les policies RLS:');
    console.log('SELECT * FROM pg_policies WHERE tablename = \'market_research_responses\';');
  } else {
    console.log('%c✅ TOUT FONCTIONNE !', 'background: #10b981; color: white; padding: 5px;');
    console.log('Le diagnostic réussit, donc le problème vient probablement du code du formulaire.');
    console.log('');
    console.log('%c💡 À VÉRIFIER:', 'background: #0891b2; color: white; padding: 5px;');
    console.log('1. Le formulaire utilise-t-il bien le même client Supabase ?');
    console.log('2. Y a-t-il une transformation des données qui cause une erreur ?');
    console.log('3. Vérifiez les logs côté serveur Supabase');
  }
  
  console.log('');
  console.log('%c📊 RÉSUMÉ COMPLET', 'background: #4338ca; color: white; font-size: 16px; padding: 5px; font-weight: bold;');
  console.table({
    'Session Active': results.session?.hasSession ? '🔴 OUI' : '🟢 NON',
    'Permission SELECT': results.grants?.canSelect ? '✅ OUI' : '❌ NON',
    'Permission INSERT': results.insert?.success ? '✅ OUI' : '❌ NON',
  });
  
  if (results.analysis.length > 0) {
    console.log('');
    console.log('%c📝 POINTS CLÉS:', 'font-weight: bold; font-size: 14px;');
    results.analysis.forEach((point: string) => console.log(point));
  }
  
  console.log('');
  console.log('%c🔍 DIAGNOSTIC TERMINÉ', 'background: #4338ca; color: white; font-size: 20px; padding: 10px; font-weight: bold;');
  
  return results;
}

// Exposer globalement pour utilisation dans la console
if (typeof window !== 'undefined') {
  (window as any).diagnosticSupabase = diagnosticSupabase;
  console.log('%c💡 Diagnostic disponible ! Tapez: window.diagnosticSupabase()', 'background: #10b981; color: white; padding: 5px;');
}
