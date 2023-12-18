import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { IBrand } from "@/interfaces/brand";
import { TBrandForm, TBrandUpdateParams } from ".";
import { uploadAndGetImgUrl } from "@/utils/image";

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
  await runTransaction(db, async (transaction) => {
    const brandCollectionRef = collection(db, "brand");
    const timestamp = serverTimestamp();

    const newBrandDocRef = await addDoc(brandCollectionRef, {
      name: brand.name,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    let photoURL = "";

    if (brand.image) {
      photoURL = await uploadAndGetImgUrl(
        brand.image,
        "brands",
        newBrandDocRef.id,
      );

      transaction.update(newBrandDocRef, { imageURL: photoURL });
    }
  });
};

export const updateBrand = async ({ id, brand }: TBrandUpdateParams) => {
  const timestamp = serverTimestamp();

  await runTransaction(db, async (transaction) => {
    const docRef = doc(db, "brand", id);

    let imageURL;

    if (brand.image) {
      imageURL = await uploadAndGetImgUrl(brand.image, "brands", docRef.id);
    }

    transaction.update(docRef, {
      name: brand.name,
      imageURL,
      updatedAt: timestamp,
    });
  });
};

export const deleteBrand = async (id: string) => {
  const docRef = doc(db, "brand", id);
  await deleteDoc(docRef);
};
