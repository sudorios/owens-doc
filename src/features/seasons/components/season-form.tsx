import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seasonSchema, SeasonFormData } from "@/domain/models/season.model";
import { useCreateSeasonMutation } from "../hooks/use-seasons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface SeasonFormProps {
  guildId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const SeasonForm = ({ guildId, onSuccess, onCancel }: SeasonFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const createSeason = useCreateSeasonMutation(guildId);

  const form = useForm<SeasonFormData>({
    resolver: zodResolver(seasonSchema),
    defaultValues: {
      guildId,
      name: "",
      active: true,
      startDate: new Date(),
    },
  });

  const onSubmit = async (data: SeasonFormData) => {
    setError(null);
    try {
      await createSeason.mutateAsync(data);
      onSuccess?.();
    } catch (err: any) {
      setError("Error al crear la temporada.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-200 bg-red-500/10 border border-red-500/50 rounded-lg">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nombre de la temporada</FormLabel>
              <FormControl>
                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="Ej: Temporada 1" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={createSeason.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
            {createSeason.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Temporada"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
