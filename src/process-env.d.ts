export {};

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        [SECRET_KEY: string]: string | undefined;
        CONNECTION_STRING: string;
        // add more environment variables and their types here
      }
    }
  }