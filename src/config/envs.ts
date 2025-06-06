import 'dotenv/config'
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_USERNAME: get('DB_USERNAME').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
    DB_DATABASE: get('DB_DATABASE').required().asString(),
    GMAIL_USER: get('GMAIL_USER').required().asString(),
    GMAIL_PASS: get('GMAIL_PASS').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
}