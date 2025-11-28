import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";
import { insertAula, aulaSchema } from "@/services/classroomServices";
import * as z from "zod";
import { toast } from "sonner";

type Props = {
  turmaId: number | string | undefined;
  onAulaCreated?: () => void;
};

export default function RegisterAulaDialog({ turmaId, onAulaCreated }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof aulaSchema>>({
    resolver: zodResolver(aulaSchema),
    defaultValues: {
      aul_nome: "",
      aul_descricao: "",
      aul_data: "",
      fk_idTurma: turmaId ? Number(turmaId) : 0,
    },
  });

  useEffect(() => {
    if (!turmaId) return;
    form.setValue("fk_idTurma", Number(turmaId));
  }, [turmaId, form]);

  const onSubmit = async (data: z.infer<typeof aulaSchema>) => {
    try {
      if (!turmaId) {
        toast.error("Turma não informada");
        return;
      }

      const payload = {
        ...data,
        fk_idTurma: Number(turmaId),
      };

      console.log("Payload para criação de aula:", payload);
      const response = await insertAula(payload);
      console.log("Resposta do insertAula:", response);

      if (
        response?.insertId ||
        response?.success ||
        (response as any)?.affectedRows === 1
      ) {
        toast.success("Aula criada com sucesso");
        setDialogOpen(false);
        form.reset();
        onAulaCreated && onAulaCreated();
      } else {
        toast.error(response?.message ?? "Erro ao criar aula");
      }
    } catch (error: any) {
      console.error("Erro ao criar aula:", error);
      toast.error(String(error?.message ?? "Erro ao criar aula"));
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-amber-300 text-white hover:bg-amber-400">
            Nova Aula
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>Cadastrar Aula</DialogTitle>
              <DialogDescription>
                Insira os dados da nova aula
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              {/* Hidden input to keep fk_idTurma as part of the validated form */}
              <input
                type="hidden"
                {...form.register("fk_idTurma", { valueAsNumber: true })}
              />
              <FormField
                control={form.control}
                name="aul_nome"
                render={({ field }) => (
                  <Input placeholder="Nome da Aula" {...field} />
                )}
              />
              {form.formState.errors.aul_nome && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.aul_nome.message}
                </span>
              )}

              <FormField
                control={form.control}
                name="aul_descricao"
                render={({ field }) => (
                  <textarea
                    placeholder="Descrição da aula"
                    className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-full"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.aul_descricao && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.aul_descricao.message}
                </span>
              )}

              <FormField
                control={form.control}
                name="aul_data"
                render={({ field }) => (
                  <Input type="date" placeholder="Data da aula" {...field} />
                )}
              />
              {form.formState.errors.aul_data && (
                <span className="text-sm text-red-600">
                  {form.formState.errors.aul_data.message}
                </span>
              )}
            </Form>

            <DialogFooter className="flex flex-col">
              <Button
                type="submit"
                className="bg-amber-300 hover:bg-amber-400 cursor-pointer w-full"
              >
                Criar Aula
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
