namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    AUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    SENDGRID_API_KEY: string;
    MAIL_FROM: string;
    APP_URL: string;

    JWT_SECRET: string;
    EMAIL_VERIFY_SECRET: string;
    RESET_PASSWORD_SECRET: string;
  }
}
