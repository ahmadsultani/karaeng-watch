import { db } from "@/config/firebase";
import { getCurrentUser } from "@/service/user";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { INotification } from "./types";

export const getAllNotification = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    throw new FirebaseError("auth/user-not-found", "User not found");

  const collectionRef = collection(db, "notification");
  const q = query(collectionRef, where("userId", "==", currentUser.uid));
  const querySnapshot = await getDocs(q);

  const notifications: INotification[] = [];

  querySnapshot.forEach((doc) => {
    const notificationData = doc.data();
    const notification = {
      ...notificationData,
      id: doc.id,
      createdAt: notificationData.createdAt.toDate(),
      updatedAt: notificationData.updatedAt.toDate(),
    } as INotification;
    notifications.push(notification);
  });

  return notifications;
};

export const createNotification = async (
  uid: string,
  title: string,
  description: string,
  link?: string,
) => {
  const collectionRef = collection(db, "notification");

  const timestamp = serverTimestamp();

  await addDoc(collectionRef, {
    title,
    description,
    link,
    isViewed: false,
    userId: uid,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const markNotificationAsViewed = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    throw new FirebaseError("auth/user-not-found", "User not found");

  const docRef = doc(db, "notification", id);

  await updateDoc(docRef, {
    isViewed: true,
  });
};
