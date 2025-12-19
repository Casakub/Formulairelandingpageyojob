/**
 * 🔍 SYSTÈME DE LOGGING PROFESSIONNEL YOJOB
 * 
 * Permet de gérer les logs de manière centralisée avec:
 * - Niveaux de log configurables (debug, info, warn, error)
 * - Mode production (désactive les logs debug)
 * - Formatage élégant avec emojis
 * - Groupement des logs
 * - Timestamps
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  timestamp: boolean;
  grouping: boolean;
}

// Configuration par défaut
const defaultConfig: LoggerConfig = {
  enabled: process.env.NODE_ENV !== 'production', // Désactivé en production
  level: 'debug',
  timestamp: true,
  grouping: false,
};

let config = { ...defaultConfig };

// Hiérarchie des niveaux
const levelHierarchy: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  success: 1,
  warn: 2,
  error: 3,
};

// Emojis par catégorie
const categoryEmojis: Record<string, string> = {
  // Navigation & UI
  navigation: '🧭',
  route: '🗺️',
  language: '🌍',
  translation: '🌐',
  ui: '🎨',
  animation: '✨',
  
  // Data & API
  api: '🔌',
  fetch: '📡',
  cache: '💾',
  storage: '🗄️',
  database: '🗃️',
  
  // Auth & Security
  auth: '🔐',
  login: '👤',
  logout: '👋',
  security: '🛡️',
  
  // Forms & Validation
  form: '📝',
  validation: '✅',
  submit: '📤',
  response: '📥',
  
  // Email & Notifications
  email: '📧',
  smtp: '✉️',
  notification: '🔔',
  toast: '🍞',
  
  // Analytics & Monitoring
  analytics: '📊',
  performance: '⚡',
  metric: '📈',
  error: '❌',
  warning: '⚠️',
  success: '✅',
  
  // AI & Automation
  ai: '🤖',
  claude: '🧠',
  scoring: '🎯',
  automation: '⚙️',
  workflow: '🔄',
  
  // CRM & Prospects
  crm: '💼',
  prospect: '👥',
  lead: '🎣',
  conversion: '💰',
  
  // Debug & Development
  debug: '🐛',
  test: '🧪',
  build: '🏗️',
  deploy: '🚀',
};

/**
 * Obtenir l'emoji approprié pour une catégorie
 */
function getEmoji(category?: string): string {
  if (!category) return '📌';
  return categoryEmojis[category.toLowerCase()] || '📌';
}

/**
 * Formater le timestamp
 */
function getTimestamp(): string {
  return new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  });
}

/**
 * Vérifier si le log doit être affiché selon le niveau
 */
function shouldLog(level: LogLevel): boolean {
  if (!config.enabled) return false;
  return levelHierarchy[level] >= levelHierarchy[config.level];
}

/**
 * Formater le préfixe du log
 */
function formatPrefix(emoji: string, category: string, level: LogLevel): string {
  const parts: string[] = [];
  
  if (config.timestamp) {
    parts.push(`[${getTimestamp()}]`);
  }
  
  parts.push(emoji);
  
  if (category) {
    parts.push(`[${category}]`);
  }
  
  return parts.join(' ');
}

/**
 * Logger class avec API fluent
 */
class Logger {
  private category?: string;

  constructor(category?: string) {
    this.category = category;
  }

  /**
   * Log de debug (développement uniquement)
   */
  debug(message: string, ...args: any[]) {
    if (!shouldLog('debug')) return;
    
    const emoji = getEmoji(this.category || 'debug');
    const prefix = formatPrefix(emoji, this.category || 'DEBUG', 'debug');
    
    console.log(`${prefix} ${message}`, ...args);
  }

  /**
   * Log d'information
   */
  info(message: string, ...args: any[]) {
    if (!shouldLog('info')) return;
    
    const emoji = getEmoji(this.category || 'info');
    const prefix = formatPrefix(emoji, this.category || 'INFO', 'info');
    
    console.log(`${prefix} ${message}`, ...args);
  }

  /**
   * Log de succès
   */
  success(message: string, ...args: any[]) {
    if (!shouldLog('success')) return;
    
    const emoji = '✅';
    const prefix = formatPrefix(emoji, this.category || 'SUCCESS', 'success');
    
    console.log(`%c${prefix} ${message}`, 'color: #10b981; font-weight: bold', ...args);
  }

  /**
   * Log d'avertissement
   */
  warn(message: string, ...args: any[]) {
    if (!shouldLog('warn')) return;
    
    const emoji = getEmoji(this.category || 'warning');
    const prefix = formatPrefix(emoji, this.category || 'WARN', 'warn');
    
    console.warn(`${prefix} ${message}`, ...args);
  }

  /**
   * Log d'erreur
   */
  error(message: string, error?: Error | any, ...args: any[]) {
    if (!shouldLog('error')) return;
    
    const emoji = getEmoji(this.category || 'error');
    const prefix = formatPrefix(emoji, this.category || 'ERROR', 'error');
    
    console.error(`${prefix} ${message}`, error, ...args);
    
    // En production, envoyer à un service de monitoring (Sentry, etc.)
    if (process.env.NODE_ENV === 'production' && error) {
      // TODO: Intégrer Sentry ou autre service de monitoring
      // Sentry.captureException(error, { extra: { message, ...args } });
    }
  }

  /**
   * Grouper des logs ensemble
   */
  group(title: string, collapsed: boolean = false) {
    if (!config.enabled) return;
    
    const emoji = getEmoji(this.category);
    const prefix = formatPrefix(emoji, this.category || 'GROUP', 'info');
    
    if (collapsed) {
      console.groupCollapsed(`${prefix} ${title}`);
    } else {
      console.group(`${prefix} ${title}`);
    }
  }

  /**
   * Terminer un groupe
   */
  groupEnd() {
    if (!config.enabled) return;
    console.groupEnd();
  }

  /**
   * Log avec table pour les données structurées
   */
  table(data: any, columns?: string[]) {
    if (!shouldLog('info')) return;
    
    const emoji = getEmoji(this.category);
    console.log(`${emoji} Table ${this.category ? `[${this.category}]` : ''}:`);
    console.table(data, columns);
  }

  /**
   * Timer pour mesurer les performances
   */
  time(label: string) {
    if (!config.enabled) return;
    
    const emoji = getEmoji(this.category || 'performance');
    console.time(`${emoji} ${label}`);
  }

  /**
   * Terminer un timer
   */
  timeEnd(label: string) {
    if (!config.enabled) return;
    
    const emoji = getEmoji(this.category || 'performance');
    console.timeEnd(`${emoji} ${label}`);
  }
}

/**
 * Factory pour créer un logger avec catégorie
 */
export function createLogger(category: string): Logger {
  return new Logger(category);
}

/**
 * Logger par défaut
 */
export const logger = new Logger();

/**
 * Configurer le logger
 */
export function configureLogger(options: Partial<LoggerConfig>) {
  config = { ...config, ...options };
}

/**
 * Désactiver tous les logs (production)
 */
export function disableLogger() {
  config.enabled = false;
}

/**
 * Activer tous les logs (développement)
 */
export function enableLogger() {
  config.enabled = true;
}

/**
 * Loggers pré-configurés pour les modules communs
 */
export const loggers = {
  navigation: createLogger('navigation'),
  language: createLogger('language'),
  translation: createLogger('translation'),
  api: createLogger('api'),
  auth: createLogger('auth'),
  form: createLogger('form'),
  email: createLogger('email'),
  ai: createLogger('ai'),
  crm: createLogger('crm'),
  analytics: createLogger('analytics'),
  performance: createLogger('performance'),
  error: createLogger('error'),
};

/**
 * Helpers spécialisés
 */
export const log = {
  /**
   * Log de navigation
   */
  route(from: string, to: string) {
    loggers.navigation.info(`Navigation: ${from} → ${to}`);
  },

  /**
   * Log de changement de langue
   */
  languageChange(from: string, to: string, source: 'manual' | 'auto' | 'url' | 'localStorage') {
    loggers.language.info(`Langue changée: ${from} → ${to} (source: ${source})`);
  },

  /**
   * Log d'appel API
   */
  apiCall(method: string, endpoint: string, data?: any) {
    loggers.api.info(`${method} ${endpoint}`, data);
  },

  /**
   * Log de réponse API
   */
  apiResponse(endpoint: string, status: number, data?: any) {
    if (status >= 200 && status < 300) {
      loggers.api.success(`✅ ${endpoint} (${status})`, data);
    } else if (status >= 400) {
      loggers.api.error(`❌ ${endpoint} (${status})`, data);
    } else {
      loggers.api.info(`${endpoint} (${status})`, data);
    }
  },

  /**
   * Log de soumission de formulaire
   */
  formSubmit(formName: string, data?: any) {
    loggers.form.info(`📤 Soumission: ${formName}`, data);
  },

  /**
   * Log de succès de formulaire
   */
  formSuccess(formName: string, responseId?: string) {
    loggers.form.success(`✅ ${formName} - ID: ${responseId || 'N/A'}`);
  },

  /**
   * Log d'erreur de formulaire
   */
  formError(formName: string, error: any) {
    loggers.form.error(`❌ ${formName}`, error);
  },

  /**
   * Log d'authentification
   */
  authChange(status: 'login' | 'logout' | 'session', user?: any) {
    if (status === 'login') {
      loggers.auth.success(`👤 Connexion réussie: ${user?.email || 'unknown'}`);
    } else if (status === 'logout') {
      loggers.auth.info(`👋 Déconnexion`);
    } else {
      loggers.auth.debug(`🔐 Session vérifiée`, user);
    }
  },

  /**
   * Log de performance
   */
  performance(metric: string, value: number, unit: 'ms' | 's' = 'ms') {
    loggers.performance.info(`⚡ ${metric}: ${value}${unit}`);
  },

  /**
   * Log d'analyse IA
   */
  aiAnalysis(type: 'scoring' | 'translation' | 'analysis', target: string, result?: any) {
    loggers.ai.info(`🤖 ${type} - ${target}`, result);
  },
};

/**
 * Export du logger par défaut
 */
export default logger;