import {
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
import { IBrand } from "@/interfaces/brand";
import { TBrandForm, TBrandUpdateParams } from ".";

export const getAllBrand = async () => {
  const querySnapshot = await getDocs(collection(db, "brand"));
  const brands: IBrand[] = [];

  const brandPromises = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    data.createdAt = data.createdAt && data.createdAt.toDate();
    data.updatedAt = data.createdAt && data.updatedAt.toDate();

    return { ...data, id: doc.id } as IBrand;
  });

  const brandResult = await Promise.all(brandPromises);
  brands.push(...brandResult);

  return brands;
};

export const getOneBrand = async (id: string) => {
  const docRef = doc(db, "brand", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Brand not found!");
  }

  const data = docSnap.data();

  data.createdAt = data.createdAt.toDate();
  data.updatedAt = data.updatedAt.toDate();

  const brand = { ...data, id: docRef.id } as IBrand;

  return brand;
};

export const createBrand = async (brand: TBrandForm) => {
  const timestamp = serverTimestamp();

  await addDoc(collection(db, "brand"), {
    ...brand,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateBrand = async ({ id, brand }: TBrandUpdateParams) => {
  const timestamp = serverTimestamp();

  const docRef = doc(db, "brand", id);
  await updateDoc(docRef, {
    ...brand,
    updatedAt: timestamp,
  });
};

export const deleteBrand = async (id: string) => {
  const docRef = doc(db, "brand", id);
  await deleteDoc(docRef);
};
