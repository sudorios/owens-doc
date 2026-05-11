import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../service/user.service";
import { UserFormData } from "@/domain/models/user.model";

export const useGetUsersQuery = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => userService.getUsers(page, pageSize),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UserFormData) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
