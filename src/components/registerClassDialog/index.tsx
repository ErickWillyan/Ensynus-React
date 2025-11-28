import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Form, FormField } from "@/components/ui/form";
import * as z from "zod";
import { insertClass } from "@/services/classServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userStore } from "@/stores/userStore";
import { toast } from "sonner";
import { useState } from "react";

export const classSchema = z.object({
  tur_nome: z.string().min(1, "Nome obrigatório"),
  tur_areaConhecimento: z.string().min(1, "Área de conhecimento obrigatória"),
  tur_descricao: z.string().min(1, "Descrição obrigatória"),
  tur_duracao: z.string().min(1, "Duração obrigatória"),
  tur_modalidade: z.string().min(1, "Modalidade obrigatória"),
});

export type ClassData = z.infer<typeof classSchema>;

export default function RegisterClassDialog() {
  const professorId = userStore((state) => state?.userId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<ClassData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      tur_nome: "",
      tur_areaConhecimento: "",
      tur_descricao: "",
      tur_duracao: "",
      tur_modalidade: "",
    },
  });

  const onSubmit = async (data: ClassData) => {
    try {
      const body = {
        ...data,
        fk_idProfessor: Number(professorId),
      };

      console.log("Payload para criação de turma:", body);
      if (!body.fk_idProfessor) {
        toast.error("Professor não autenticado");
        return;
      }
      const response = await insertClass(body);

      if (response?.affectedRows == 1) {
        toast.success("Turma criada com sucesso");
        setDialogOpen(false);
      }
      form.reset();
    } catch (error: any) {
      console.error("Erro ao inserir turma:", error);
      toast.error(String(error?.message ?? "Erro ao criar turma"));
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="border-amber-300 bg-amber-300 hover:bg-amber-400 hover:border-amber-400 text-white border-2 cursor-pointer hover:text-amber-300">
            Criar Turma
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>Cadastrar Turma</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova turma
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <FormField
                control={form.control}
                name="tur_nome"
                render={({ field }) => (
                  <Input placeholder="Nome da Turma" {...field} />
                )}
              />
              {form.formState.errors.tur_nome && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.tur_nome.message}
                </span>
              )}

              <FormField
                control={form.control}
                name="tur_areaConhecimento"
                render={({ field }) => (
                  <Input placeholder="Área de Conhecimento" {...field} />
                )}
              />
              {form.formState.errors.tur_areaConhecimento && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.tur_areaConhecimento.message}
                </span>
              )}

              <FormField
                control={form.control}
                name="tur_descricao"
                render={({ field }) => (
                  <textarea
                    placeholder="Descrição"
                    className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-full"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.tur_descricao && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.tur_descricao.message}
                </span>
              )}

              <FormField
                control={form.control}
                name="tur_duracao"
                render={({ field }) => (
                  <Input placeholder="Duração (ex: 2horas)" {...field} />
                )}
              />
              {form.formState.errors.tur_duracao && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.tur_duracao.message}
                </span>
              )}

              <FormField
                control={form.control}
                name="tur_modalidade"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                      <SelectItem value="Remoto">Remoto</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.tur_modalidade && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.tur_modalidade.message}
                </span>
              )}
            </Form>

            <DialogFooter className="flex flex-col">
              <Button
                type="submit"
                className="bg-amber-300 hover:bg-amber-400 cursor-pointer w-full"
              >
                Criar Turma
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
