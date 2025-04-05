import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await axios.post("/api/auth/register", data);
    return response.data;
  },
};
