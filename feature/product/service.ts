import {
  DocumentReference,
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { IProduct } from "@/interfaces/product";
import { IBrand } from "@/interfaces/brand";
import { TProductForm, TProductParams, TProductUpdateParams } from ".";
import { checkFavoriteExists } from "../favorite/services";

export const getAllProduct = async () => {
  const querySnapshot = await getDocs(collection(db, "product"));
  const products: IProduct[] = [];

  const productPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const brandRef = doc.data().brand as DocumentReference;
    const brandSnap = await getDoc(brandRef);
    const brandData = brandSnap.data() as IBrand;

    const isFavorite = await checkFavoriteExists(doc.id);

    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();

    const brand = {
      ...brandData,
      id: brandSnap.id,
    };

    return { ...data, id: doc.id, brand, isFavorite } as IProduct;
  });

  const productResults = await Promise.all(productPromises);
  products.push(...productResults);

  return products;
};

export const getAllProductByParams = async (params: TProductParams) => {
  const { gender, brandId, price_lte, price_gte, type } = params;

  const andQueries = [];
  const orQueries = [];

  if (gender) {
    orQueries.push(
      where("gender", "==", gender),
      where("gender", "==", "unisex"),
    );
  }

  if (brandId) {
    const brandRef = (await getDoc(doc(db, "brand", brandId)))
      .ref as DocumentReference;
    andQueries.push(where("brand", "==", brandRef));
  }

  if (price_lte) andQueries.push(where("price", "<=", price_lte));

  if (price_gte) andQueries.push(where("price", ">=", price_gte));

  if (type) andQueries.push(where("types", "==", type));

  const querySnapshot = await getDocs(
    query(collection(db, "product"), and(...andQueries, or(...orQueries))),
  );

  const products: IProduct[] = [];

  const productPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const brandRef = doc.data().brand as DocumentReference;
    const brandSnap = await getDoc(brandRef);
    const brandData = brandSnap.data() as IBrand;

    const isFavorite = await checkFavoriteExists(doc.id);

    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();

    const brand = {
      ...brandData,
      id: brandSnap.id,
    };

    return { ...data, id: doc.id, brand, isFavorite } as IProduct;
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

  product.price = Number(product.price);
  product.stock = Number(product.stock);

  await addDoc(collection(db, "product"), {
    ...product,
    sold: 0,
    brand: brandRef,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateProduct = async ({ id, product }: TProductUpdateParams) => {
  const brandRef = product.brandId
    ? doc(db, "brand", product.brandId)
    : undefined;
  const timestamp = serverTimestamp();

  product.price = Number(product.price);
  product.stock = Number(product.stock);

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
