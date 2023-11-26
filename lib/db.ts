import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> =
  global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
