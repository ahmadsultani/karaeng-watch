import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";

import { TLoginForm, TSignupForm } from "./types";
import { IUser, TRole } from "@/interfaces/user";

import { USER_NOT_FOUND } from "@/constants/errors";
import { FirebaseError } from "firebase/app";

export const signup = async (values: TSignupForm) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );

  const user: IUser = {
    uid: userCredentials.user.uid,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    photoURL: userCredentials.user.photoURL,
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "user", user.uid), user);

  return user;
};

export const login = async (values: TLoginForm, role: TRole = "user") => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );

  const docRef = doc(db, "user", userCredentials.user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    signOut(auth);
    throw new FirebaseError("auth/user-not-found", USER_NOT_FOUND);
  }

  if (role !== "user" && docSnap.data()?.role === "user") {
    signOut(auth);
    throw new FirebaseError(
      "auth/operation-not-allowed",
      "Operation not allowed",
    );
  }

  return docSnap.data() as IUser;
};

export const logout = async () => {
  await signOut(auth);
};

export const signinWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredentials = await signInWithPopup(auth, provider);
  const docRef = doc(db, "user", userCredentials.user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const user: IUser = {
      uid: userCredentials.user.uid,
      firstName: userCredentials.user.displayName?.split(" ")[0] || "",
      lastName: userCredentials.user.displayName?.split(" ")[1] || "",
      email: userCredentials.user.email || "",
      photoURL: userCredentials.user.photoURL || "",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "user", user.uid), user);

    return user;
  }

  return docSnap.data() as IUser;
};

export const checkAccountExists = async (email: string) => {
  const user = query(collection(db, "user"), where("email", "==", email));

  const querySnapshot = await getDocs(user);

  return querySnapshot.docs.length > 0;
};
