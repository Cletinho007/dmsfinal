"use client";

import { useState } from "react";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";
import AlunoForm from "@/components/AlunoForm";

export default function CadastroAluno() {
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = new FormData(form);
    setSalvando(true);
    setMsg(null);
    try {
      const idade = String(dados.get("idade") ?? "");
      await pb.collection("tb_aluno").create({
        nome: dados.get("nome"),
        idade: idade === "" ? null : Number(idade),
        email: dados.get("email"),
        telefone: dados.get("telefone"),
      });
      setMsg({ tipo: "ok", texto: "Aluno cadastrado com sucesso!" });
      form.reset();
    } catch {
      setMsg({ tipo: "erro", texto: "Não foi possível cadastrar. Verifique os dados e a conexão com o banco." });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="page-title">Cadastrar aluno</h1>
      <p className="page-subtitle">Preencha os dados para adicionar um novo aluno.</p>

      {msg && (
        <div role="status"
          className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
            msg.tipo === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}>
          {msg.texto}{" "}
          {msg.tipo === "ok" && (
            <Link href="/alunos/consulta" className="font-semibold underline">Ver alunos</Link>
          )}
        </div>
      )}

      <div className="card mt-6">
        <AlunoForm salvando={salvando} textoBotao="Cadastrar" onSubmit={salvar} />
      </div>
    </div>
  );
}
