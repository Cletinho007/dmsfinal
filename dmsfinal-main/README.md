# Gestão de Alunos

Next.js 16 + Tailwind CSS 4 + PocketBase.

## Rodar localmente

1. Inicie o PocketBase (na pasta `pocktbase`): `./pocketbase.exe serve` (padrão em http://127.0.0.1:8090).
2. Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_POCKETBASE_URL` se necessário.
3. `npm install` e `npm run dev` → http://localhost:3000

## Publicar

1. Hospede o PocketBase em um endereço público (HTTPS) levando a pasta `pb_data`.
2. Na Vercel, importe o repositório e defina a variável `NEXT_PUBLIC_POCKETBASE_URL` com a URL pública do PocketBase.
3. No PocketBase, a coleção `tb_aluno` precisa permitir listar/ver/criar/alterar/deletar (regras de API vazias).
