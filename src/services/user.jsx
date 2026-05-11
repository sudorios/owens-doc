import { userService } from "../features/users/service/user.service";

export const getUser = userService.getUser;
export const searchUsers = userService.searchUsers;
export const getAllUser = userService.getUsers;
export const createUser = userService.createUser;