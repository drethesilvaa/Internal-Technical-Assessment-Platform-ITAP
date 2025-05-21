export interface UserDTO {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "reviewer" | "candidate";
}
