import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <section className="max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-300 mb-4">
            Aprenda o que quiser de onde quiser
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Venha para Ensynus. A plataforma ideal para aprender e ensinar com
            flexibilidade e qualidade.
          </p>
          {/* <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/homeTeacher")}
              className="bg-amber-300 text-white hover:bg-amber-400"
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate("/RegisterUser")}
              variant="outline"
              className="border-amber-300 text-amber-300"
            >
              Cadastre-se
            </Button>
          </div> */}
        </section>
      </main>
    </>
  );
}
