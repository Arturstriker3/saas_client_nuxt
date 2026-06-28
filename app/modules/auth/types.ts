export type AuthUser = {
  name: string;
  email: string;
  role?: string;
  language?: string;
  birthDate?: string | Date | null;
  createdAt?: string | Date;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};
