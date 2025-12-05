import { useState, useEffect } from 'react';
import { Search, X, Filter, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Question } from '../../config/questions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AdvancedSearchProps {
  questions: Question[];
  onFilteredQuestionsChange: (filtered: Question[]) => void;
}

export function AdvancedSearch({ questions, onFilteredQuestionsChange }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVisible, setFilterVisible] = useState<string>('all');
  const [filterRequired, setFilterRequired] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Apply all filters with useEffect to avoid setState during render
  useEffect(() => {
    let filtered = [...questions];

    // Text search (code, label, placeholder)
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(q =>
        q.code.toLowerCase().includes(lowerQuery) ||
        q.label.toLowerCase().includes(lowerQuery) ||
        q.placeholder?.toLowerCase().includes(lowerQuery) ||
        q.options?.some(opt => opt.label.toLowerCase().includes(lowerQuery))
      );
    }

    // Section filter
    if (filterSection !== 'all') {
      filtered = filtered.filter(q => q.section === parseInt(filterSection));
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(q => q.type === filterType);
    }

    // Visible filter
    if (filterVisible !== 'all') {
      filtered = filtered.filter(q => 
        filterVisible === 'visible' ? q.visible : !q.visible
      );
    }

    // Required filter
    if (filterRequired !== 'all') {
      filtered = filtered.filter(q => 
        filterRequired === 'required' ? q.required : !q.required
      );
    }

    onFilteredQuestionsChange(filtered);
  }, [searchQuery, filterSection, filterType, filterVisible, filterRequired, questions, onFilteredQuestionsChange]);

  // Handlers - just update state, useEffect will handle the filtering
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSectionChange = (value: string) => {
    setFilterSection(value);
  };

  const handleTypeChange = (value: string) => {
    setFilterType(value);
  };

  const handleVisibleChange = (value: string) => {
    setFilterVisible(value);
  };

  const handleRequiredChange = (value: string) => {
    setFilterRequired(value);
  };

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setFilterSection('all');
    setFilterType('all');
    setFilterVisible('all');
    setFilterRequired('all');
  };

  // Count active filters
  const activeFiltersCount = [
    filterSection !== 'all',
    filterType !== 'all',
    filterVisible !== 'all',
    filterRequired !== 'all',
    searchQuery.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="🔍 Rechercher par code, label, ou contenu..."
            className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`border-slate-200 hover:bg-slate-100 ${
            showFilters ? 'bg-cyan-500/10 border-cyan-400 text-cyan-700' : 'text-slate-700'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500 text-white text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-slate-600 hover:text-slate-900"
          >
            <X className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Section Filter */}
            <div>
              <label className="text-slate-700 text-sm mb-2 block">Section</label>
              <Select value={filterSection} onValueChange={handleSectionChange}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sections</SelectItem>
                  <SelectItem value="1">Section 1 - Profil</SelectItem>
                  <SelectItem value="2">Section 2 - Détachement</SelectItem>
                  <SelectItem value="3">Section 3 - Besoins</SelectItem>
                  <SelectItem value="4">Section 4 - Intérêt</SelectItem>
                  <SelectItem value="5">Section 5 - Vision</SelectItem>
                  <SelectItem value="6">Section 6 - Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-slate-700 text-sm mb-2 block">Type</label>
              <Select value={filterType} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="text">Texte court</SelectItem>
                  <SelectItem value="textarea">Texte long</SelectItem>
                  <SelectItem value="number">Nombre</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="radio">Choix unique</SelectItem>
                  <SelectItem value="multi-select">Choix multiple</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Visibility Filter */}
            <div>
              <label className="text-slate-700 text-sm mb-2 block">Visibilité</label>
              <Select value={filterVisible} onValueChange={handleVisibleChange}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="visible">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-green-600" />
                      Visibles uniquement
                    </div>
                  </SelectItem>
                  <SelectItem value="hidden">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-slate-400" />
                      Masquées uniquement
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Required Filter */}
            <div>
              <label className="text-slate-700 text-sm mb-2 block">Obligation</label>
              <Select value={filterRequired} onValueChange={handleRequiredChange}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="required">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Obligatoires
                    </div>
                  </SelectItem>
                  <SelectItem value="optional">Optionnelles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-slate-600 text-sm">Filtres actifs :</span>
                {searchQuery && (
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-700 text-xs rounded-full border border-cyan-200">
                    Recherche: "{searchQuery}"
                  </span>
                )}
                {filterSection !== 'all' && (
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-700 text-xs rounded-full border border-blue-200">
                    Section {filterSection}
                  </span>
                )}
                {filterType !== 'all' && (
                  <span className="px-2 py-1 bg-violet-500/10 text-violet-700 text-xs rounded-full border border-violet-200">
                    Type: {filterType}
                  </span>
                )}
                {filterVisible !== 'all' && (
                  <span className="px-2 py-1 bg-green-500/10 text-green-700 text-xs rounded-full border border-green-200">
                    {filterVisible === 'visible' ? 'Visibles' : 'Masquées'}
                  </span>
                )}
                {filterRequired !== 'all' && (
                  <span className="px-2 py-1 bg-red-500/10 text-red-700 text-xs rounded-full border border-red-200">
                    {filterRequired === 'required' ? 'Obligatoires' : 'Optionnelles'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-slate-600 text-sm flex items-center gap-2">
        <span className="text-cyan-600">{questions.length}</span>
        <span>question(s) trouvée(s)</span>
        {activeFiltersCount > 0 && (
          <>
            <span>sur</span>
            <span className="text-slate-400">{questions.length} total</span>
          </>
        )}
      </div>
    </div>
  );
}
