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

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;

    MEDIA_S3_REGION: string;
    MEDIA_S3_BUCKET_ARN: string;
    MEDIA_CLOUDFRNT_URL: string;
    MEDIA_S3_BUCKET: string;
  }
}
