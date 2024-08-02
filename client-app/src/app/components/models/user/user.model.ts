export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  passwordHash: string;
  refreshToken: string;
  refreshTokenExpiryTime: Date;
}
