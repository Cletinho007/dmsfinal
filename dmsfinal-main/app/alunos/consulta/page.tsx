"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";
import type { Aluno } from "@/lib/aluno";

export default function ConsultarAluno() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState("");
  const [excluir, setExcluir] = useState<Aluno | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    pb.collection("tb_aluno")
      .getFullList<Aluno>({ sort: "nome", requestKey: null })
      .then(setAlunos)
      .catch(() => setErro("Não foi possível carregar os alunos. Verifique a conexão com o banco."))
      .finally(() => setCarregando(false));
  }, []);

  const filtrados = alunos.filter((a) =>
    (a.nome ?? "").toLowerCase().includes(busca.toLowerCase())
  );

  async function confirmarExclusao() {
    if (!excluir) return;
    try {
      await pb.collection("tb_aluno").delete(excluir.id);
      setAlunos((lista) => lista.filter((a) => a.id !== excluir.id));
    } catch {
      setErro("Não foi possível deletar o aluno.");
    }
    setExcluir(null);
  }

  const acoes = (a: Aluno) => (
    <div className="flex gap-2">
      <Link href={`/alunos/alterar/${a.id}`} className="btn-secondary btn-sm">Alterar</Link>
      <button onClick={() => setExcluir(a)} className="btn-danger btn-sm">Deletar</button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Alunos</h1>
          <p className="page-subtitle">{alunos.length} aluno(s) cadastrado(s)</p>
        </div>
        <Link href="/alunos/cadastro" className="btn-primary">+ Novo aluno</Link>
      </div>

      <input type="search" placeholder="Buscar aluno por nome" value={busca}
        onChange={(e) => setBusca(e.target.value)} className="input mt-6" />

      {erro && (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {erro}
        </div>
      )}

      {carregando ? (
        <p className="mt-6 text-sm text-slate-500">Carregando...</p>
      ) : filtrados.length === 0 ? (
        <div className="card mt-6 text-center text-sm text-slate-500">Nenhum aluno encontrado</div>
      ) : (
        <>
          {/* Celular: cartões */}
          <ul className="mt-6 space-y-3 md:hidden">
            {filtrados.map((a) => (
              <li key={a.id} className="card p-4!">
                <p className="font-semibold text-slate-900">{a.nome}</p>
                <dl className="mt-2 space-y-1 text-sm text-slate-600">
                  <div><dt className="inline font-medium">Idade: </dt><dd className="inline">{a.idade ?? "—"}</dd></div>
                  <div><dt className="inline font-medium">E-mail: </dt><dd className="inline break-all">{a.email || "—"}</dd></div>
                  <div><dt className="inline font-medium">Telefone: </dt><dd className="inline">{a.telefone || "—"}</dd></div>
                </dl>
                <div className="mt-4">{acoes(a)}</div>
              </li>
            ))}
          </ul>

          {/* Computador: tabela */}
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="th">Nome</th>
                  <th className="th">Idade</th>
                  <th className="th">E-mail</th>
                  <th className="th">Telefone</th>
                  <th className="th">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtrados.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="td font-medium text-slate-900">{a.nome}</td>
                    <td className="td">{a.idade ?? "—"}</td>
                    <td className="td">{a.email || "—"}</td>
                    <td className="td">{a.telefone || "—"}</td>
                    <td className="td">{acoes(a)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {excluir && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Deletar aluno</h2>
            <p className="mt-2 text-sm text-slate-600">
              Deseja realmente deletar <strong>{excluir.nome}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button onClick={() => setExcluir(null)} className="btn-secondary">Cancelar</button>
              <button onClick={confirmarExclusao} className="btn-danger">Sim, deletar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
