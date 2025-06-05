export interface User {
  id?: string;
  name: string;
  userName: string;
  passwordHash: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  token: string;
}
