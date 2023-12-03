import { db } from "@/config/firebase";
import { IBrand } from "@/interfaces/brand";
import { collection, getDocs } from "firebase/firestore";

export const getAllBrand = async () => {
  const querySnapshot = await getDocs(collection(db, "brand"));
  const brands: IBrand[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as IBrand;

    brands.push({ ...data, id: doc.id });
  });

  return brands;
};
