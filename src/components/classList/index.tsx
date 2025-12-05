import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getClassPerTeacher,
  type ClassResponse,
} from "@/services/classServices";
import { userStore } from "@/stores/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClassList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<ClassResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchClasses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getClassPerTeacher(Number(userId));
        setClasses(response);
      } catch (err) {
        setError("Erro ao buscar turmas");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [userId]);

  if (!userId) {
    return (
      <Card className="max-w-3xl m-auto">
        <CardHeader>
          <CardTitle>Aguardando login</CardTitle>
          <CardDescription>Faça login para ver suas turmas</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading)
    return (
      <Card className="max-w-3xl m-auto">
        <CardHeader>
          <CardTitle>Carregando turmas...</CardTitle>
        </CardHeader>
      </Card>
    );

  if (error)
    return (
      <Card className="max-w-3xl m-auto">
        <CardHeader>
          <CardTitle>Erro</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );

  if (!classes || classes.length === 0)
    return (
      <Card className="max-w-3xl m-auto">
        <CardHeader>
          <CardTitle>Nenhuma turma encontrada</CardTitle>
          <CardDescription>Você ainda não criou nenhuma turma</CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <div className="grid gap-4 max-w-4xl m-auto">
      {classes.map((turma) => (
        <Card key={turma.tur_id}>
          <CardHeader>
            <CardTitle className="text-amber-400">{turma.tur_nome}</CardTitle>
            <CardDescription>{turma.tur_areaConhecimento}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {turma.tur_descricao}
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm font-semibold  text-sky-950">
              {turma.tur_modalidade} • {turma.tur_duracao}
            </div>
            <div>
              <Button
                size="sm"
                className="cursor-pointer bg-amber-300 text-white hover:bg-amber-400"
                onClick={() =>
                  navigate(
                    `/homeTeacher/turma/${turma.tur_id}/${encodeURIComponent(
                      turma.tur_nome
                    )}`
                  )
                }
              >
                Acessar
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
