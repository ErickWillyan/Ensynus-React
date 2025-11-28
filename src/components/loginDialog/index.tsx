import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// no local state required
import { Form, FormField } from "@/components/ui/form";
import * as z from "zod";
import { loginTeacher } from "@/services/teacherServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/stores/userStore";
import { toast } from "sonner";

export const loginSchema = z.object({
  pro_email: z.string().email("Email inválido"),
  pro_senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export default function LoginDialog() {
  const navigate = useNavigate();
  const insertUserId = userStore((state) => state.insertUserId);
  const setAuth = userStore((state) => state.setAuth);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      pro_email: "",
      pro_senha: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await loginTeacher(data);

      if (response?.pro_nome && response?.pro_id) {
        toast.success(`Olá ${response.pro_nome}`);
        insertUserId(response.pro_id);
        setAuth(true);
        navigate("/HomeTeacher");
      }

      form.reset();
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(String(error?.message ?? "Credenciais inválidas"));
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="border-amber-300 bg-amber-300 hover:bg-amber-400 hover:border-amber-400 text-white border-2 cursor-pointer hover:text-amber-300">
            Entrar
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>Faça login na sua conta</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <FormField
                control={form.control}
                name="pro_email"
                render={({ field }) => <Input placeholder="Email" {...field} />}
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
            </Form>

            <DialogFooter className="flex flex-col">
              <Button
                type="submit"
                className="bg-amber-300 hover:bg-amber-400 cursor-pointer w-full"
              >
                Entrar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
