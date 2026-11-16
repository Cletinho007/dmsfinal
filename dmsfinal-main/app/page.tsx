import Link from "next/link";

const acoes = [
  { href: "/alunos/cadastro", titulo: "Cadastrar aluno", texto: "Adicione um novo aluno ao sistema.", icone: "+" },
  { href: "/alunos/consulta", titulo: "Consultar alunos", texto: "Busque, altere ou remova alunos cadastrados.", icone: "⌕" },
];

export default function Home() {
  return (
    <div>
      <section className="rounded-3xl bg-linear-to-br from-indigo-600 to-indigo-800 px-6 py-12 text-center text-white shadow-lg sm:px-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Gestão de Alunos</h1>
        <p className="mx-auto mt-4 max-w-xl text-indigo-100 sm:text-lg">
          Cadastre, consulte e mantenha os dados dos alunos em um só lugar.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/alunos/cadastro" className="btn bg-white text-indigo-700 hover:bg-indigo-50">
            Cadastrar aluno
          </Link>
          <Link href="/alunos/consulta" className="btn border border-white/40 text-white hover:bg-white/10">
            Ver alunos
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {acoes.map((a) => (
          <Link key={a.href} href={a.href}
            className="card group flex items-start gap-4 transition hover:border-indigo-300 hover:shadow-md">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-xl font-bold text-indigo-600">
              {a.icone}
            </span>
            <span>
              <span className="block font-semibold text-slate-900 group-hover:text-indigo-700">{a.titulo}</span>
              <span className="mt-1 block text-sm text-slate-500">{a.texto}</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
