import { db } from "@/config/firebase";
import { IOrder } from "@/interfaces/order";
import { collection, getDocs } from "firebase/firestore";

export const getCollectionSize = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);
  const collectionSnapshot = await getDocs(collectionRef);
  return collectionSnapshot.size;
};

export const getTotalRevenue = async () => {
  const collectionRef = collection(db, "order");
  const collectionSnapshot = await getDocs(collectionRef);
  let totalRevenue = 0;
  collectionSnapshot.forEach((doc) => {
    const orderData = doc.data();
    if (orderData.status === "done" || orderData.status === "delivered") {
      totalRevenue += orderData.totalPrice;
    }
  });
  return totalRevenue;
};

export const getDailyRevenue = async () => {
  const collectionRef = collection(db, "order");

  const querySnapshot = await getDocs(collectionRef);

  const orders: IOrder[] = [];
  querySnapshot.forEach((doc) => {
    const orderData = doc.data();
    const order: IOrder = {
      id: doc.id,
      user: orderData.user,
      status: orderData.status,
      isReviewed: orderData.isReviewed,
      products: orderData.products,
      createdAt: orderData.createdAt.toDate(),
      updatedAt: orderData.updatedAt
        ? orderData.updatedAt?.toDate()
        : undefined,
      totalPrice: orderData.totalPrice,
      totalProduct: orderData.totalProduct,
    };
    orders.push(order);
  });

  const dailyRevenues = orders.reduce(
    (acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-US");
      if (!acc[date]) {
        acc[date] = 0;
      }
      if (order.status === "done" || order.status === "delivered") {
        acc[date] += order.totalPrice;
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  return dailyRevenues;
};
