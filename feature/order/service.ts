import { db } from "@/config/firebase";
import { IOrder, TOrderStatus } from "@/interfaces/order";
import { IProduct } from "@/interfaces/product";
import { IUser } from "@/interfaces/user";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    const ordersCollection = collection(db, "order");
    const querySnapshot = await getDocs(ordersCollection);

    const orders: IOrder[] = [];
    querySnapshot.forEach((doc) => {
      const orderData = doc.data(); // Explicitly cast to IOrder
      const order: IOrder = {
        id: doc.id,
        user: orderData.user,
        status: orderData.status,
        isReviewed: orderData.isReviewed,
        products: orderData.products,
        createdAt: orderData.createdAt.toDate(),
        userID: orderData.userID,
      };
      orders.push(order);
    });

    return orders;
  } catch (error) {
    toast.error("Error fetching orders: ");
    throw new Error("Failed to fetch orders");
  }
};

export const createOrderFromDetail = async (
  user: IUser,
  product: IProduct,
): Promise<void> => {
  try {
    const timestamp = serverTimestamp();

    const orderData: Omit<IOrder, "id" | "createdAt"> = {
      user: user,
      status: "waiting" as TOrderStatus,
      isReviewed: false,
      products: [
        {
          product: product,
          quantity: 1,
        },
      ],
    };

    await addDoc(collection(db, "order"), {
      ...orderData,
      createdAt: timestamp,
      userID: user.uid,
    });
  } catch (error) {
    toast.error("Something went wrong while creating the order.");
  }
};

export const updateOrderStatus = async (
  orderId: string,
  order: IOrder,
  status: string,
): Promise<void> => {
  try {
    const orderRef = doc(db, "order", orderId);
    await updateDoc(orderRef, {
      ...order,
      status: status,
    });
  } catch (error) {
    toast.error("Failed to update order status");
    throw new Error("Failed to update order status");
  }
};
