/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUOTE_EMAIL: string
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
