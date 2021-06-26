import { createConnection } from 'typeorm'

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrationsRun: true,
  logging: true,
  entities: [
    "src/entities/*.ts"
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ]
})