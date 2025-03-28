/// <reference types="vite/client" />

    interface ImportMetaEnv {
      readonly VITE_BACKEND_API_URL: string; // Add the new variable
    }

    interface ImportMeta {
      readonly env: ImportMetaEnv
    }
