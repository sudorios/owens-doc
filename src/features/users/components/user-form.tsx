import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/domain/models/user.model";
import { useCreateUserMutation } from "../hooks/use-users";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface UserFormProps {
  onSuccess?: () => void;
}

export const UserForm = ({ onSuccess }: UserFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const createUser = useCreateUserMutation();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userId: "",
      username: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setError(null);
    try {
      await createUser.mutateAsync(data);
      onSuccess?.();
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setError(err.response.data.error || "El usuario ya existe.");
      } else {
        setError("Error al crear el usuario. Por favor, inténtelo de nuevo.");
      }
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
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Discord ID</FormLabel>
              <FormControl>
                <Input className="bg-black/50 border-gray-700 text-white" placeholder="Ej: 410835225464143883" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nombre de Usuario</FormLabel>
              <FormControl>
                <Input className="bg-black/50 border-gray-700 text-white" placeholder="Nombre de usuario de Discord" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={createUser.isPending} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
            {createUser.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Usuario"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
