import { db } from "@/config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { IProduct } from "@/interfaces/product";
import { IUser } from "@/interfaces/user";
import Cookies from "js-cookie";
import { getOneProduct } from "../product";
import { FirebaseError } from "firebase/app";

export const getAllFavoriteProduct = async () => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) return [];

  const q = query(collection(db, "favorite"), where("userId", "==", user.uid));

  const { docs } = await getDocs(q);

  const products: IProduct[] = [];

  const productPromises = docs.map(async (d) => {
    const favData = d.data();
    const productId = favData.productId;

    const product = await getOneProduct(productId);

    return product;
  });

  const productResults = await Promise.all(productPromises);
  products.push(...productResults);

  return products;
};

export const addFavorite = async (productId: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) {
    throw new FirebaseError("auth/user-not-found", "User not found");
  }

  const favoriteRef = doc(db, "favorite", `${user.uid}_${productId}`);
  const isFavorite = await checkFavoriteExists(productId);

  if (isFavorite) {
    return;
  }

  await setDoc(favoriteRef, {
    userId: user.uid,
    productId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const checkFavoriteExists = async (productId: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) return false;

  const docRef = doc(db, "favorite", `${user.uid}_${productId}`);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.exists();
};

export const deleteFavorite = async (productTd: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) {
    throw new FirebaseError("auth/user-not-found", "User not found");
  }

  await deleteDoc(doc(db, "favorite", `${user.uid}_${productTd}`));
};
