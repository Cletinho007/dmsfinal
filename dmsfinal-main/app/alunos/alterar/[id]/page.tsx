"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import type { Aluno } from "@/lib/aluno";
import AlunoForm from "@/components/AlunoForm";

export default function AlterarAluno() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    pb.collection("tb_aluno")
      .getOne<Aluno>(id, { requestKey: null })
      .then(setAluno)
      .catch(() => setErro("Aluno não encontrado ou banco indisponível."))
      .finally(() => setCarregando(false));
  }, [id]);

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    setSalvando(true);
    setErro(null);
    try {
      const idade = String(dados.get("idade") ?? "");
      await pb.collection("tb_aluno").update(id, {
        nome: dados.get("nome"),
        idade: idade === "" ? null : Number(idade),
        email: dados.get("email"),
        telefone: dados.get("telefone"),
      });
      router.push("/alunos/consulta");
    } catch {
      setErro("Não foi possível salvar as alterações.");
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="page-title">Alterar aluno</h1>
      <p className="page-subtitle">Atualize os dados e salve as alterações.</p>

      {erro && (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {erro}
        </div>
      )}

      <div className="card mt-6">
        {carregando && <p className="text-sm text-slate-500">Carregando...</p>}
        {aluno && (
          <AlunoForm aluno={aluno} salvando={salvando} textoBotao="Salvar alterações"
            onSubmit={salvar} onCancelar={() => router.push("/alunos/consulta")} />
        )}
      </div>
    </div>
  );
}
