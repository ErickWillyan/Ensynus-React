import { api } from "@/api/axios";
import * as z from "zod";

export const aulaSchema = z.object({
  aul_nome: z.string().min(1, "O nome da aula é obrigatório"),
  aul_descricao: z.string().optional(),
  aul_data: z.string().min(1, "A data da aula é obrigatória"),
  fk_idTurma: z.number().min(1, "O ID da turma é obrigatório"),
});

type AulaData = z.infer<typeof aulaSchema>;

export type ResponseInsertAula = {
  success?: boolean;
  message?: string;
  insertId?: number;
  error?: string;
};

export type AulaResponse = {
  aul_id: number;
  aul_nome: string;
  aul_descricao: string | null;
  aul_data: string;
  fk_idTurma: number;
};

export const insertAula = async (
  data: AulaData
): Promise<ResponseInsertAula | null> => {
  try {
    const response = await api.post<ResponseInsertAula>(
      "/aulas/insertAula",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao inserir aula:", error);
    return null;
  }
};

export const getAulasByTurma = async (
  turmaId: number | string
): Promise<AulaResponse[] | null> => {
  try {
    const response = await api.get<AulaResponse[]>(`/aulas/turma/${turmaId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar aulas da turma:", error);
    return null;
  }
};
