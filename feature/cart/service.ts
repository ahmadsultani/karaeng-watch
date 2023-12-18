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
  updateDoc,
  where,
} from "firebase/firestore";
import { TCartForm, TCartResponse } from "./type";
import { ICart } from "@/interfaces/cart";
import { FirebaseError } from "firebase/app";
import Cookies from "js-cookie";
import { IUser } from "@/interfaces/user";
import { getOneProduct } from "@/feature/product/service";

export const getAllCart = async () => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) throw new FirebaseError("auth/user-not-found", "User not found");

  const q = query(collection(db, "cart"), where("userId", "==", user.uid));

  const querySnap = await getDocs(q);

  let totalPrice = 0,
    totalSum = 0;

  if (querySnap.empty) {
    return {
      cart: [],
      totalPrice,
      totalSum,
    } as TCartResponse;
  }

  const cart = querySnap.docs.map(async (d) => {
    const data = d.data();

    const product = await getOneProduct(data.productId);

    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();

    totalSum += data.quantity;
    totalPrice += product.price * data.quantity;

    return {
      ...data,
      product,
      id: d.id,
    } as ICart;
  });

  const cartResult = await Promise.all(cart);

  return {
    cart: cartResult,
    totalPrice,
    totalSum,
  } as TCartResponse;
};

export const getCartById = async (id: string) => {
  const docRef = doc(db, "cart", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();

  const product = await getOneProduct(data.productId);

  data.createdAt = data.createdAt.toDate();
  data.updatedAt = data.updatedAt.toDate();

  return {
    ...data,
    product,
    price: product.price,
    id: docSnap.id,
  };
};

export const addToCart = async (data: TCartForm) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) {
    throw new FirebaseError("auth/user-not-found", "User not found");
  }

  await setDoc(
    doc(db, "cart", `${user.uid}_${data.productId}`),
    {
      ...data,
      userId: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
};

export const checkCartExists = async (productId: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  if (!user) return false;

  const q = query(
    collection(db, "cart"),
    where("userId", "==", user.uid),
    where("productId", "==", productId),
  );

  const querySnap = await getDocs(q);

  return querySnap.docs.length > 0;
};

export const updateCartQuantity = async (
  id: string,
  type: "increase" | "decrease" | "delete",
) => {
  const docRef = doc(db, "cart", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new FirebaseError("cart/not-found", "Cart not found");
  }

  const data = docSnap.data();

  if (type === "increase") {
    await updateDoc(docRef, {
      quantity: data.quantity + 1,
    });
  } else if (type === "decrease") {
    await updateDoc(docRef, {
      quantity: data.quantity - 1,
    });
  } else if (type === "delete") {
    await deleteDoc(docRef);
  }
};

export const deleteFromCart = async (id: string) => {
  await deleteDoc(doc(db, "cart", id));
};
