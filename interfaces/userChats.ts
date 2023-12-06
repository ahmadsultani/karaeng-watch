import firebase from "firebase/compat/app";

export interface IUserChats {
  id: string;
  date: firebase.firestore.Timestamp;
  lastMessage: string;
  senderId: string;
}
