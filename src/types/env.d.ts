declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string;
    API_BASE_URL: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
  }
}
