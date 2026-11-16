"use client";

import type { Aluno } from "@/lib/aluno";

type Props = {
  aluno?: Aluno;
  salvando: boolean;
  textoBotao: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancelar?: () => void;
};

export default function AlunoForm({ aluno, salvando, textoBotao, onSubmit, onCancelar }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="nome" className="label">Nome do aluno</label>
        <input id="nome" name="nome" type="text" required defaultValue={aluno?.nome ?? ""}
          placeholder="Ex.: Maria da Silva" className="input" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="idade" className="label">Idade</label>
          <input id="idade" name="idade" type="number" min={0} max={120} inputMode="numeric"
            defaultValue={aluno?.idade ?? ""} placeholder="Ex.: 20" className="input" />
        </div>
        <div>
          <label htmlFor="telefone" className="label">Telefone</label>
          <input id="telefone" name="telefone" type="tel" defaultValue={aluno?.telefone ?? ""}
            placeholder="(65) 99999-9999" className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input id="email" name="email" type="email" defaultValue={aluno?.email ?? ""}
          placeholder="aluno@email.com" className="input" />
      </div>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        {onCancelar && (
          <button type="button" onClick={onCancelar} className="btn-secondary">Cancelar</button>
        )}
        <button type="submit" disabled={salvando} className="btn-primary">
          {salvando ? "Salvando..." : textoBotao}
        </button>
      </div>
    </form>
  );
}
