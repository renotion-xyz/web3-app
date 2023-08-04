/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ALCHEMY_KEY: string;
    REACT_APP_WC_PROJECT_ID: string;
    REACT_APP_RENOTION_CONTRACT: string;
    REACT_APP_API_BASE_URL: string;
    NODE_ENV: 'test' | 'development' | 'production';
  }
}