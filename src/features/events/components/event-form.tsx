import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormData } from "@/domain/models/event.model";
import { useCreateEventMutation } from "../hooks/use-events";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface EventFormProps {
  guildId: string;
  seasonId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EventForm = ({ guildId, seasonId, onSuccess, onCancel }: EventFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const createEvent = useCreateEventMutation(seasonId);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      guildId,
      seasonId,
      name: "",
      state: "ACTIVE",
    },
  });

  const onSubmit = async (data: EventFormData) => {
    setError(null);
    try {
      await createEvent.mutateAsync(data);
      onSuccess?.();
    } catch (err: any) {
      setError("Error al crear el evento.");
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
              <FormLabel className="text-gray-300">Nombre del Evento</FormLabel>
              <FormControl>
                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="Ej: Fastlane" {...field} />
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
          <Button type="submit" disabled={createEvent.isPending} className="bg-blue-600 hover:bg-blue-700 text-white">
            {createEvent.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Evento"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
