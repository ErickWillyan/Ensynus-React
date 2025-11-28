import { api } from "@/api/axios";
import * as z from "zod";
import { classSchema } from "@/components/registerClassDialog";

type classData = z.infer<typeof classSchema>;

type ResponseInsertTurma = {
  affectedRows: number;
  insertId: number;
};

export type ClassResponse = {
  tur_id: number;
  tur_areaConhecimento: string;
  tur_descricao: string;
  tur_nome: string;
  tur_duracao: string;
  tur_modalidade: string;
  fk_idProfessor: number;
};

export const insertClass = async (
  data: classData
): Promise<ResponseInsertTurma | null> => {
  try {
    const response = await api.post<ResponseInsertTurma>(
      "/turma/insertTurma",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao inserir turma: ", error);
    return null;
  }
};

export const getClassPerTeacher = async (
  teacherId: number | string
): Promise<ClassResponse[] | null> => {
  try {
    const response = await api.get<ClassResponse[]>(
      `/turma/getTurmaPorProfessor/${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar turmas do professor: ", error);
    return null;
  }
};
