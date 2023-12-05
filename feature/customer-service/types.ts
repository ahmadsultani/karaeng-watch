import { Timestamp } from "firebase/firestore";

export interface IChatMessage {
  id: string;
  message: string;
  senderId: string;
  date: Timestamp;
}
