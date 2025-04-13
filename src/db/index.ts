import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

// TODO: prisma 1.0.0 버전 serverless 라이브러리 사용 시 수정 필요
// 만약에 1.0.0 버전과 prisma 1.0.0 버전이 호환되지 않는다면 수정 필요
const adapter = new PrismaNeon({
  connectionString,
});

declare global {
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
