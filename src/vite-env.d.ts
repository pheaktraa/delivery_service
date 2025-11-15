/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add more variables if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
