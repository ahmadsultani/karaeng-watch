import { auth, db } from "@/config/firebase";
import {
  DocumentReference,
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
import { IBrand } from "@/interfaces/brand";

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
    const productData = productSnap.data()!;

    const brandRef = productData.brand as DocumentReference;
    const brandSnap = await getDoc(brandRef);
    const brandData = brandSnap.data() as IBrand;

    const brand = {
      ...brandData,
      id: brandSnap.id,
    };

    const product = {
      ...productData,
      brand,
      id: productSnap.id,
      isFavorite: true,
    };

    return product as IProduct;
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
