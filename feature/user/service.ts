import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// import { TProductParams } from "./types";
import { db } from "@/config/firebase";
import { TUserUpdateParams } from ".";
import { IUser } from "@/interfaces/user";

export const getAllUser = async () => {
  const querySnapshot = await getDocs(collection(db, "user"));
  const users: IUser[] = [];

  const userPromises = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return { ...data, uid: doc.id } as IUser;
  });

  const userResult = await Promise.all(userPromises);
  users.push(...userResult);

  return users;
};

export const getOneUser = async (id: string) => {
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("User not found!");
  }

  const data = docSnap.data();

  const user = { ...data, uid: docRef.id } as IUser;

  return user;
};

export const setUserToAdmin = async ({ uid, user }: TUserUpdateParams) => {
  const docRef = doc(db, "user", uid);
  await updateDoc(docRef, {
    ...user,
    updatedAt: new Date().toISOString(),
    role: "admin",
  });
};
export const setDemoteAdmin = async ({ uid, user }: TUserUpdateParams) => {
  const docRef = doc(db, "user", uid);
  await updateDoc(docRef, {
    ...user,
    updatedAt: new Date().toISOString(),
    role: "user",
  });
};
