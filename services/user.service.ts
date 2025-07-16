import { USER_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";

class UserService extends APIService {
  getCurrentUser() {
    return this.get(USER_ENDPOINTS.GET_CURRENT_USER)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default UserService;
