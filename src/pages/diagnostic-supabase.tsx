import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function DiagnosticSupabase() {
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [grantCheck, setGrantCheck] = useState<any>(null);
  const [insertTest, setInsertTest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostic = async () => {
    setLoading(true);
    
    // 1. Vérifier la session actuelle
    console.log('🔍 Vérification session...');
    const { data: { session } } = await supabase!.auth.getSession();
    
    const sessionData = {
      hasSession: !!session,
      role: session?.user?.role || 'anon',
      userId: session?.user?.id || 'none',
      accessToken: session?.access_token ? session.access_token.substring(0, 20) + '...' : 'none',
      expiresAt: session?.expires_at || 'none',
    };
    
    setSessionInfo(sessionData);
    console.log('📊 Session info:', sessionData);
    
    // 2. Tester un SELECT simple pour vérifier les GRANTS
    console.log('🔍 Test SELECT (vérification READ permission)...');
    const { data: selectData, error: selectError } = await supabase!
      .from('market_research_responses')
      .select('id')
      .limit(1);
    
    const grantData = {
      canSelect: !selectError,
      selectError: selectError ? {
        code: selectError.code,
        message: selectError.message,
        details: selectError.details,
      } : null,
      rowCount: selectData?.length || 0,
    };
    
    setGrantCheck(grantData);
    console.log('📊 GRANT check:', grantData);
    
    // 3. Tester un INSERT simple
    console.log('🔍 Test INSERT...');
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
    
    const { data: insertData, error: insertError } = await supabase!
      .from('market_research_responses')
      .insert([testData])
      .select()
      .single();
    
    const insertResult = {
      success: !insertError,
      error: insertError ? {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
      } : null,
      insertedId: insertData?.id || null,
    };
    
    setInsertTest(insertResult);
    console.log('📊 INSERT test:', insertResult);
    
    setLoading(false);
  };

  const clearSession = async () => {
    console.log('🧹 Suppression de la session...');
    await supabase!.auth.signOut();
    alert('✅ Session supprimée ! Rechargez la page puis relancez le diagnostic.');
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  const StatusIcon = ({ success }: { success: boolean }) => 
    success ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">🔍 Diagnostic Supabase Complet</h1>
          <p className="text-cyan-200">
            Identification du problème RLS
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={runDiagnostic}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Relancer Diagnostic
          </Button>
          <Button
            onClick={clearSession}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10"
          >
            🧹 Supprimer Session
          </Button>
        </div>

        {/* Configuration */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              ⚙️ Configuration Supabase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80">
            <div><strong>Project ID:</strong> {projectId}</div>
            <div><strong>Anon Key:</strong> {publicAnonKey.substring(0, 30)}...</div>
            <div><strong>URL:</strong> https://{projectId}.supabase.co</div>
          </CardContent>
        </Card>

        {/* Session Info */}
        {sessionInfo && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {sessionInfo.hasSession ? (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                Session JWT
              </CardTitle>
              <CardDescription className="text-white/60">
                {sessionInfo.hasSession 
                  ? '⚠️ Une session est active (peut causer le problème)'
                  : '✅ Pas de session active (normal pour formulaire public)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-white/80">
              <div><strong>Has Session:</strong> {sessionInfo.hasSession ? '🔴 OUI (PROBLÈME!)' : '🟢 NON (OK)'}</div>
              <div><strong>Role:</strong> {sessionInfo.role}</div>
              <div><strong>User ID:</strong> {sessionInfo.userId}</div>
              <div><strong>Access Token:</strong> {sessionInfo.accessToken}</div>
              <div><strong>Expires At:</strong> {sessionInfo.expiresAt}</div>
            </CardContent>
          </Card>
        )}

        {/* GRANT Check */}
        {grantCheck && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <StatusIcon success={grantCheck.canSelect} />
                GRANT Check (SELECT Permission)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-white/80">
              <div><strong>Can SELECT:</strong> {grantCheck.canSelect ? '✅ OUI' : '❌ NON'}</div>
              <div><strong>Rows Found:</strong> {grantCheck.rowCount}</div>
              {grantCheck.selectError && (
                <div className="mt-4 p-4 bg-red-500/20 rounded-lg border border-red-500/50">
                  <div><strong>❌ Erreur SELECT:</strong></div>
                  <div className="text-sm mt-2 font-mono">
                    <div>Code: {grantCheck.selectError.code}</div>
                    <div>Message: {grantCheck.selectError.message}</div>
                    <div>Details: {grantCheck.selectError.details || 'none'}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* INSERT Test */}
        {insertTest && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <StatusIcon success={insertTest.success} />
                INSERT Test
              </CardTitle>
              <CardDescription className="text-white/60">
                {insertTest.success 
                  ? '✅ INSERT fonctionne ! Le problème vient peut-être du formulaire.'
                  : '❌ INSERT échoue - C\'est bien un problème de permissions.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-white/80">
              <div><strong>Success:</strong> {insertTest.success ? '✅ OUI' : '❌ NON'}</div>
              {insertTest.insertedId && (
                <div><strong>Inserted ID:</strong> {insertTest.insertedId}</div>
              )}
              {insertTest.error && (
                <div className="mt-4 p-4 bg-red-500/20 rounded-lg border border-red-500/50">
                  <div><strong>❌ Erreur INSERT:</strong></div>
                  <div className="text-sm mt-2 font-mono">
                    <div>Code: {insertTest.error.code}</div>
                    <div>Message: {insertTest.error.message}</div>
                    <div>Details: {insertTest.error.details || 'none'}</div>
                    <div>Hint: {insertTest.error.hint || 'none'}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analyse */}
        {sessionInfo && grantCheck && insertTest && (
          <Card className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle className="text-white">🎯 Analyse Automatique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-white">
              {sessionInfo.hasSession && (
                <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/50">
                  <strong>⚠️ PROBLÈME DÉTECTÉ:</strong> Une session est active !
                  <br />
                  <small>Le client essaie de s'authentifier au lieu d'utiliser le rôle anon.</small>
                  <br />
                  <small>→ Cliquez sur "🧹 Supprimer Session" puis rechargez la page.</small>
                </div>
              )}
              
              {!sessionInfo.hasSession && !grantCheck.canSelect && (
                <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/50">
                  <strong>❌ PROBLÈME CRITIQUE:</strong> Le rôle anon n'a pas la permission SELECT !
                  <br />
                  <small>→ Vérifiez les GRANTS dans Supabase SQL Editor.</small>
                  <br />
                  <small>→ Exécutez: GRANT SELECT, INSERT ON market_research_responses TO anon;</small>
                </div>
              )}
              
              {!sessionInfo.hasSession && grantCheck.canSelect && !insertTest.success && (
                <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/50">
                  <strong>❌ PROBLÈME:</strong> SELECT fonctionne mais pas INSERT !
                  <br />
                  <small>Code erreur: {insertTest.error?.code}</small>
                  <br />
                  {insertTest.error?.code === '42501' && (
                    <>
                      <small>→ Le rôle anon n'a pas la permission INSERT OU les policies RLS bloquent.</small>
                      <br />
                      <small>→ Vérifiez: GRANT INSERT ON market_research_responses TO anon;</small>
                      <br />
                      <small>→ Et vérifiez les policies RLS avec TO anon.</small>
                    </>
                  )}
                </div>
              )}
              
              {!sessionInfo.hasSession && grantCheck.canSelect && insertTest.success && (
                <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/50">
                  <strong>✅ TOUT FONCTIONNE ICI !</strong>
                  <br />
                  <small>Le diagnostic réussit mais le formulaire échoue ?</small>
                  <br />
                  <small>→ Le problème vient probablement du code du formulaire.</small>
                  <br />
                  <small>→ Vérifiez que le formulaire utilise bien le même client Supabase.</small>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
