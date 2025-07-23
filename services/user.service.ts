import { USER_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";
import {
  User,
  StudentProfile,
  EmployerProfile,
  UpdateUserForm,
} from "@/interfaces";

class UserService extends APIService {
  /**
   * Retrieves the current user's information.
   * @returns A promise that resolves to the current user's information.
   */
  getCurrentUser(): Promise<User> {
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
  getProfile(userId: string): Promise<StudentProfile | EmployerProfile> {
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
  updateProfile(userId: string, data: UpdateUserForm): Promise<User> {
    return this.put(USER_ENDPOINTS.PROFILE_INFO(userId), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default UserService;
