import { auth, db } from "@/config/firebase";
import { IProduct } from "@/interfaces/product";
import {
  DocumentReference,
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

export const getAllCart = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser)
    throw new FirebaseError("auth/user-not-found", "User not found");

  const q = query(
    collection(db, "cart"),
    where("userId", "==", currentUser.uid),
  );

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

    const productRef = doc(db, "product", data.productId);
    const productSnap = await getDoc(productRef);
    const productData = productSnap.data();

    const product = {
      ...productData,
      id: productSnap.id,
      createdAt: productData?.createdAt?.toDate(),
      updatedAt: productData?.updatedAt?.toDate(),
    } as IProduct;

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

  const productRef = doc(db, "product", data.productId);
  const productSnap = await getDoc(productRef);
  const productData = productSnap.data();

  const brandRef = productData?.brand as DocumentReference;
  const brandSnap = await getDoc(brandRef);
  const brandData = brandSnap.data();

  const brand = {
    ...brandData,
    id: brandSnap.id,
  };

  const product = {
    ...productData,
    brand,
    id: productSnap.id,
    createdAt: productData?.createdAt?.toDate(),
    updatedAt: productData?.updatedAt?.toDate(),
  } as IProduct;

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
  const currentUser = auth.currentUser;

  if (!currentUser) return false;

  await setDoc(
    doc(db, "cart", `${currentUser.uid}_${data.productId}`),
    {
      ...data,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
};

export const checkCartExists = async (productId: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) return false;

  const q = query(
    collection(db, "cart"),
    where("userId", "==", currentUser.uid),
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

  if (!docSnap.exists()) return;

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
