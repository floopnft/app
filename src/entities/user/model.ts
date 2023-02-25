export interface User {
  id: string;
  walletAddress: string;
  onboarded: boolean;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
