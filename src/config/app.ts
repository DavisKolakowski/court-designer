interface AppConfig {
  quoteEmail: string;
}

// Get environment variables with fallbacks for development
const getConfig = (): AppConfig => {
  return {
    // In Azure Static Web Apps, use VITE_QUOTE_EMAIL environment variable
    // Fallback to the original email for local development
    quoteEmail: import.meta.env.VITE_QUOTE_EMAIL || '',
  };
};

export const appConfig = getConfig();
