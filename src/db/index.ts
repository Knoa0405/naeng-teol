import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig, Pool } from "@neondatabase/serverless";

// 트랜잭션, 세션 사용시 필요
// import ws from "ws";

// neonConfig.webSocketConstructor = ws;

const createPrismaClient = () => {
  const connectionString = process.env.POSTGRES_PRISMA_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
