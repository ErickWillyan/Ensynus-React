import { api } from "@/api/axios";
import { teacherSchema } from "@/pages/RegisterUser";
import * as z from "zod";

type TeacherData = z.infer<typeof teacherSchema>;

type LoginResult = {
  pro_id: string;
  pro_nome: string;
};

interface InsertProfessorResponse {
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  info: string;
  insertId: number;
  serverStatus: number;
  warningStatus: number;
}

export const insertTeacher = async (
  data: TeacherData
): Promise<InsertProfessorResponse | null> => {
  try {
    const response = await api.post<InsertProfessorResponse>(
      "/professor/insertProfessor",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao inserir professor:", error);
    return null;
  }
};

export const loginTeacher = async (data: {
  pro_email: string;
  pro_senha: string;
}) => {
  try {
    const response = await api.post<LoginResult>(
      "/professor/loginProfessor",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return null;
  }
};
