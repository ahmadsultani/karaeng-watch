import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
// import { TProductParams } from "./types";
import { db } from "@/config/firebase";
import { IProduct } from "@/interfaces/product";
import { IBrand } from "@/interfaces/brand";
import { TProductForm, TProductUpdateParams } from ".";

export const getAllProduct = async () => {
  const querySnapshot = await getDocs(collection(db, "product"));
  const products: IProduct[] = [];

  const productPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const brandRef = doc.data().brand as DocumentReference;
    const brandSnap = await getDoc(brandRef);
    const brandData = brandSnap.data() as IBrand;

    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();

    const brand = {
      ...brandData,
      id: brandSnap.id,
    };

    return { ...data, id: doc.id, brand } as IProduct;
  });

  const productResults = await Promise.all(productPromises);
  products.push(...productResults);

  return products;
};

export const getOneProduct = async (id: string) => {
  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Product not found!");
  }

  const data = docSnap.data();

  data.createdAt = data.createdAt.toDate();
  data.updatedAt = data.updatedAt.toDate();

  const brandRef = data.brand as DocumentReference;
  const brandSnap = await getDoc(brandRef);

  if (!brandSnap.exists()) {
    throw new Error("Brand not found!");
  }

  const brandData = brandSnap.data();
  const brand = {
    ...brandData,
    id: brandSnap.id,
  } as IBrand;

  const product = { ...data, id: docRef.id, brand } as IProduct;

  return product;
};

export const createProduct = async (product: TProductForm) => {
  const brandRef = doc(db, "brand", product.brandId);
  const timestamp = serverTimestamp();

  await addDoc(collection(db, "product"), {
    ...product,
    brand: brandRef,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateProduct = async ({ id, product }: TProductUpdateParams) => {
  const brandRef = product.brandId && doc(db, "brand", product.brandId);
  const timestamp = serverTimestamp();

  const docRef = doc(db, "product", id);
  await updateDoc(docRef, {
    ...product,
    brand: brandRef,
    updatedAt: timestamp,
  });
};

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, "product", id);
  await deleteDoc(docRef);
};
