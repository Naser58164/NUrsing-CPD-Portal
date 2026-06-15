import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  output: "./node_modules/.prisma/client",
});
