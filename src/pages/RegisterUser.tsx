import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { insertTeacher } from "@/services/teacherServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const teacherSchema = z.object({
  pro_nome: z.string("Nome obrigatório"),
  pro_email: z.string().email("Email inválido"),
  pro_senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  pro_dataNasc: z.string("Data de nascimento obrigatória"),
});

export default function RegisterUser() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      pro_nome: "",
      pro_email: "",
      pro_senha: "",
      pro_dataNasc: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await insertTeacher(data);
      if (response?.affectedRows === 1) {
        toast.success("Professor cadastrado com sucesso");
      }
    } catch (error: any) {
      toast.error(String(error?.message ?? "Erro inesperado"));
    } finally {
      form.reset();
    }
  };

  function parseLocalDate(dateString: string) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return (
    <>
      <div className="bg-gray-200 ">
        {/* sonner toasts are used for notifications (success/error) */}
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="">Cadastro de Professor</CardTitle>
            <CardDescription>Faça seu cadastro</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="pro_nome"
                  render={({ field }) => (
                    <Input placeholder="Nome" {...field} />
                  )}
                />
                {form.formState.errors.pro_nome && (
                  <span className="text-sm text-red-600">
                    {form.formState.errors.pro_nome.message}
                  </span>
                )}
                <FormField
                  control={form.control}
                  name="pro_email"
                  render={({ field }) => (
                    <Input placeholder="Email" {...field} />
                  )}
                />
                {form.formState.errors.pro_email && (
                  <span className="text-sm text-red-600">
                    {form.formState.errors.pro_email.message}
                  </span>
                )}
                <FormField
                  control={form.control}
                  name="pro_senha"
                  render={({ field }) => (
                    <Input placeholder="Senha" type="password" {...field} />
                  )}
                />
                {form.formState.errors.pro_senha && (
                  <span className="text-sm text-red-600">
                    {form.formState.errors.pro_senha.message}
                  </span>
                )}
                <FormField
                  control={form.control}
                  name="pro_dataNasc"
                  render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker"
                          className="justify-between font-normal"
                        >
                          {field.value
                            ? parseLocalDate(field.value).toLocaleDateString()
                            : "Selecione uma data"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full overflow-hidden p-0"
                        align="center"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value
                              ? parseLocalDate(field.value)
                              : undefined
                          }
                          captionLayout="dropdown"
                          className="w-[300px]"
                          onSelect={(selectedDate) => {
                            if (!selectedDate) return;

                            const year = selectedDate.getFullYear();
                            const month = String(
                              selectedDate.getMonth() + 1
                            ).padStart(2, "0");
                            const day = String(selectedDate.getDate()).padStart(
                              2,
                              "0"
                            );
                            const formatted = `${year}-${month}-${day}`;

                            field.onChange(formatted);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {form.formState.errors.pro_dataNasc && (
                  <span className="text-sm text-red-600">
                    {form.formState.errors.pro_dataNasc.message}
                  </span>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="bg-amber-300 hover:bg-amber-400 cursor-pointer w-full"
            >
              Cadastre-se
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
