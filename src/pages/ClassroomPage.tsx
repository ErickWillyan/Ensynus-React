import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAulasByTurma,
  type AulaResponse,
} from "@/services/classroomServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RegisterAulaDialog from "@/components/registerAulaDialog";

export default function ClassroomPage() {
  const { turmaId, turmaNome } = useParams();
  const navigate = useNavigate();
  const [aulas, setAulas] = useState<AulaResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAulas = useCallback(async () => {
    if (!turmaId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getAulasByTurma(turmaId);
      setAulas(response);
    } catch (err) {
      setError("Erro ao carregar aulas");
      toast.error("Erro ao carregar aulas");
    } finally {
      setLoading(false);
    }
  }, [turmaId]);

  useEffect(() => {
    fetchAulas();
  }, [fetchAulas]);

  return (
    <div className="max-w-4xl m-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-sky-950">{turmaNome}</h1>
        <div className="flex gap-3">
          <RegisterAulaDialog
            turmaId={turmaId}
            onAulaCreated={() => fetchAulas()}
          />
          <Button variant="ghost" onClick={() => navigate("/homeTeacher")}>
            Voltar
          </Button>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Carregando aulas...</CardTitle>
          </CardHeader>
        </Card>
      ) : error ? (
        <Card>
          <CardHeader>
            <CardTitle>Erro</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : !aulas || aulas.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma aula encontrada</CardTitle>
            <CardDescription>
              Não há aulas cadastradas para essa turma
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {aulas.map((aula) => (
            <Card key={aula.aul_id}>
              <CardHeader>
                <CardTitle className="text-amber-400">
                  {aula.aul_nome}
                </CardTitle>
                <CardDescription>
                  {" "}
                  {new Date(aula.aul_data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {aula.aul_descricao}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
