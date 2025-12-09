import { useState } from 'react';
import { Download, FileSpreadsheet, FileJson, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface ProspectsExportProps {
  filters?: {
    type?: string;
    status?: string;
    country?: string;
    search?: string;
  };
}

export function ProspectsExport({ filters }: ProspectsExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const fetchAllProspects = async () => {
    const params = new URLSearchParams({
      limit: '10000', // Récupérer tous les prospects
    });

    if (filters?.type && filters.type !== 'all') {
      params.append('type', filters.type);
    }
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.country) {
      params.append('country', filters.country);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/list?${params}`,
      {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data.prospects || [];
  };

  const exportToCSV = async () => {
    setIsExporting(true);
    try {
      const prospects = await fetchAllProspects();

      if (prospects.length === 0) {
        alert('Aucun prospect à exporter');
        return;
      }

      // Définir les colonnes
      const headers = [
        'ID',
        'Type',
        'Source',
        'Statut',
        'Nom',
        'Email',
        'Téléphone',
        'Entreprise',
        'Pays',
        'Secteur',
        'Besoin',
        'Message',
        'Responsable',
        'Prochaine Action',
        'Date Création',
        'Dernière Mise à Jour',
      ];

      // Convertir les données
      const rows = prospects.map((p: any) => [
        p.id,
        p.type,
        p.source,
        p.status,
        p.name || '',
        p.email,
        p.phone || '',
        p.company || '',
        p.country_code || '',
        p.sector || '',
        p.need_type || '',
        (p.message || '').replace(/"/g, '""'), // Échapper les guillemets
        p.responsible_name || '',
        p.next_action_label || '',
        new Date(p.created_at).toLocaleDateString('fr-FR'),
        new Date(p.updated_at).toLocaleDateString('fr-FR'),
      ]);

      // Créer le CSV
      const csvContent = [
        headers.join(','),
        ...rows.map((row) =>
          row.map((cell) => `"${cell}"`).join(',')
        ),
      ].join('\n');

      // Télécharger
      const blob = new Blob(['\uFEFF' + csvContent], {
        type: 'text/csv;charset=utf-8;',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `prospects_yojob_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      alert(`✅ ${prospects.length} prospects exportés avec succès !`);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('❌ Erreur lors de l\'export CSV');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    setIsExporting(true);
    try {
      const prospects = await fetchAllProspects();

      if (prospects.length === 0) {
        alert('Aucun prospect à exporter');
        return;
      }

      // Créer le JSON
      const jsonContent = JSON.stringify(prospects, null, 2);

      // Télécharger
      const blob = new Blob([jsonContent], {
        type: 'application/json',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `prospects_yojob_${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      alert(`✅ ${prospects.length} prospects exportés avec succès !`);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('❌ Erreur lors de l\'export JSON');
    } finally {
      setIsExporting(false);
    }
  };

  const exportForHubSpot = async () => {
    setIsExporting(true);
    try {
      const prospects = await fetchAllProspects();

      if (prospects.length === 0) {
        alert('Aucun prospect à exporter');
        return;
      }

      // Format HubSpot (colonnes spécifiques)
      const headers = [
        'First Name',
        'Last Name',
        'Email',
        'Phone Number',
        'Company Name',
        'Country',
        'Industry',
        'Lead Status',
        'Lead Source',
        'Notes',
      ];

      const rows = prospects.map((p: any) => {
        const [firstName, ...lastNameParts] = (p.name || '').split(' ');
        return [
          firstName || '',
          lastNameParts.join(' ') || '',
          p.email,
          p.phone || '',
          p.company || '',
          p.country_code || '',
          p.sector || '',
          p.status,
          p.source,
          p.message || '',
        ];
      });

      const csvContent = [
        headers.join(','),
        ...rows.map((row) =>
          row.map((cell) => `"${cell}"`).join(',')
        ),
      ].join('\n');

      const blob = new Blob(['\uFEFF' + csvContent], {
        type: 'text/csv;charset=utf-8;',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `prospects_hubspot_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      alert(`✅ ${prospects.length} prospects exportés au format HubSpot !`);
    } catch (error) {
      console.error('Error exporting for HubSpot:', error);
      alert('❌ Erreur lors de l\'export HubSpot');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Export...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Exporter
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Exporter en CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON} className="gap-2">
          <FileJson className="w-4 h-4" />
          Exporter en JSON
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportForHubSpot} className="gap-2">
          <FileSpreadsheet className="w-4 h-4 text-orange-500" />
          Format HubSpot
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
