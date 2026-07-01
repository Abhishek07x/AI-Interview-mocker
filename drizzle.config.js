import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./utils/schema.js",

  // driver: "pglite",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_jB7Mwn8qedko@ep-proud-thunder-aqe3pdwn-pooler.c-8.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require",
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  entities: {
    roles: {
      provider: '',
      exclude: [],
      include: []
    }
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
