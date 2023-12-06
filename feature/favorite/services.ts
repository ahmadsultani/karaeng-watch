import { auth, db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { IProduct } from "@/interfaces/product";

export const getAllFavoriteProduct = async () => {
  const userId = auth.currentUser?.uid as string;

  const q = query(collection(db, "favorite"), where("userId", "==", userId));

  const { docs } = await getDocs(q);

  const products: IProduct[] = [];

  const productPromises = docs.map(async (d) => {
    const favData = d.data();
    const productId = favData.productId;
    const productRef = doc(db, "product", productId);

    const productSnap = await getDoc(productRef);
    const productData = productSnap.data() as IProduct;
    const product = {
      ...productData,
      id: productSnap.id,
      isFavorited: true,
    };
    return product;
  });

  const productResults = await Promise.all(productPromises);
  products.push(...productResults);

  return products;
};

export const addFavorite = async (productId: string) => {
  const userId = auth.currentUser?.uid as string;
  const favoriteRef = collection(db, "favorite");
  const isFavorited = await checkFavoriteExists(productId);

  if (isFavorited) {
    return;
  }

  await addDoc(favoriteRef, {
    userId,
    productId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const checkFavoriteExists = async (productId: string) => {
  const userId = auth.currentUser?.uid as string;
  if (!userId) return false;
  const q = query(
    collection(db, "favorite"),
    where("userId", "==", userId),
    where("productId", "==", productId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
};

export const deleteFavorite = async (productTd: string) => {
  const userId = auth.currentUser?.uid as string;
  const q = query(
    collection(db, "favorite"),
    where("userId", "==", userId),
    where("productId", "==", productTd),
  );
  const querySnapshot = await getDocs(q);
  const docId = querySnapshot.docs[0].id;
  await deleteDoc(doc(db, "favorite", docId));
};
