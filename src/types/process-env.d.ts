import { Secret,GetPublicKeyOrSecret } from "jsonwebtoken";

export {};

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        SECRET_KEY: Secret | GetPublicKeyOrSecret;
        CONNECTION_STRING: string;
        // add more environment variables and their types here
      }
    }
  }