export interface INotification {
  id: string;
  title: string;
  link?: string;
  description: string;
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
}
