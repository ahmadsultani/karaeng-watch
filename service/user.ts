import { doc, getDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/config/firebase";

import { USER_NOT_FOUND } from "@/constants/errors";
import { IUser } from "@/interfaces/user";

export const getCurrentUser = async () => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not found!");

  const docRef = doc(db, "user", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(USER_NOT_FOUND);
  }

  return docSnap.data() as IUser;
};

export const updateUser = async (data: Partial<IUser>) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not found!");

  const docRef = doc(db, "user", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(USER_NOT_FOUND);
  }

  await updateDoc(docRef, data);
};
