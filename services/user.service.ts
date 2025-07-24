import { USER_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";
import {
  IEmployerProfile,
  IStudentProfile,
  IUser,
  IUserProfile,
  IUserSearchParams,
  PaginatedResponse,
} from "@/interfaces";

class UserService extends APIService {
  /**
   * Retrieves the current user's information.
   * @returns A promise that resolves to the current user's information.
   */
  getCurrentUser(): Promise<IUser> {
    return this.get(USER_ENDPOINTS.GET_CURRENT_USER)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieves the profile information for a given user ID.
   * @param userId - The ID of the user to retrieve the profile for.
   * @returns A promise that resolves to the user's profile information.
   */
  getProfile(
    userId: string,
  ): Promise<IUserProfile | IStudentProfile | IEmployerProfile> {
    return this.get(USER_ENDPOINTS.PROFILE_INFO(userId))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates the profile information for a given user ID.
   * @param userId - The ID of the user to update the profile for.
   * @param data - The data to update the profile with.
   * @returns A promise that resolves to the updated profile information.
   */
  updateProfile(
    userId: string,
    data: Partial<IUserProfile | IStudentProfile | IEmployerProfile>,
  ): Promise<IUserProfile | IStudentProfile | IEmployerProfile> {
    return this.put(USER_ENDPOINTS.PROFILE_INFO(userId), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets all users (admin only).
   * @param params - Search parameters for filtering users.
   * @returns A promise that resolves to a paginated response of users.
   */
  getUsers(params?: IUserSearchParams): Promise<PaginatedResponse<IUser>> {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append("search", params.search);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.is_active !== undefined)
      queryParams.append("is_active", params.is_active.toString());
    if (params?.date_joined_from)
      queryParams.append("date_joined_from", params.date_joined_from);
    if (params?.date_joined_to)
      queryParams.append("date_joined_to", params.date_joined_to);
    if (params?.location) queryParams.append("location", params.location);
    if (params?.page) queryParams.append("page", params.page.toString());

    const url = queryParams.toString()
      ? `${USER_ENDPOINTS.LIST_USERS}?${queryParams.toString()}`
      : USER_ENDPOINTS.LIST_USERS;

    return this.get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Gets a specific user by ID (admin only).
   * @param userId - The ID of the user to retrieve.
   * @returns A promise that resolves to the user.
   */
  getUser(userId: string): Promise<IUser> {
    return this.get(USER_ENDPOINTS.USER_DETAIL(userId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates a user (admin only).
   * @param userId - The ID of the user to update.
   * @param data - The data to update the user with.
   * @returns A promise that resolves to the updated user.
   */
  updateUser(userId: string, data: Partial<IUser>): Promise<IUser> {
    return this.put(USER_ENDPOINTS.USER_DETAIL(userId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes a user (admin only).
   * @param userId - The ID of the user to delete.
   * @returns A promise that resolves to the deleted user.
   */
  deleteUser(userId: string): Promise<string> {
    return this.delete(USER_ENDPOINTS.USER_DETAIL(userId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Bulk updates users (admin only).
   * @param userIds - The IDs of the users to update.
   * @param data - The data to update the users with.
   * @returns A promise that resolves to the updated users.
   */
  bulkUpdateUsers(userIds: string[], data: Partial<IUser>): Promise<string> {
    return this.put(USER_ENDPOINTS.BULK_UPDATE_USERS, {
      user_ids: userIds,
      data,
    })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default UserService;
