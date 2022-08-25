import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}
// 여러개 생기는 client 를 관리 해주기 위함.
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
