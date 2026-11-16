import PocketBase from "pocketbase";

// URL do PocketBase vem de variável de ambiente (definida na Vercel em produção).
// Em desenvolvimento local, usa o PocketBase padrão em 127.0.0.1:8090.
const url = process.env.NEXT_PUBLIC_POCKETBASE_URL ?? "http://127.0.0.1:8090";

export const pb = new PocketBase(url);
