import { db } from "@/config/firebase";
import { IOrder, TOrderStatus } from "@/interfaces/order";
import { IProduct } from "@/interfaces/product";
import { IUser } from "@/interfaces/user";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { createNotification } from "../notification/service";
import { notification_messages } from "@/constants/notification";

export const getAllOrders = async (
  status?: TOrderStatus,
  userId?: string,
): Promise<IOrder[]> => {
  try {
    const collectionRef = collection(db, "order");

    const queries = [];

    if (status) queries.push(where("status", "==", status));

    if (userId) queries.push(where("userID", "==", userId));

    const q = query(collectionRef, ...queries);
    const querySnapshot = await getDocs(q);

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
        updatedAt: orderData.updatedAt
          ? orderData.updatedAt?.toDate()
          : undefined,
        userID: orderData.userID,
        totalPrice: orderData.totalPrice,
      };
      orders.push(order);
    });

    return orders;
  } catch (error) {
    toast.error("Error fetching orders: ");
    throw new Error("Failed to fetch orders");
  }
};

export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  try {
    const orderRef = doc(db, "order", orderId);
    const docSnapshot = await getDoc(orderRef);

    if (docSnapshot.exists()) {
      const orderData = docSnapshot.data();
      const order: IOrder = {
        id: docSnapshot.id,
        user: orderData.user,
        status: orderData.status,
        isReviewed: orderData.isReviewed,
        products: orderData.products,
        createdAt: orderData.createdAt.toDate(),
        userID: orderData.userID,
        updatedAt: orderData.updatedAt.toDate(),
        totalPrice: orderData.totalPrice,
      };

      return order;
    } else {
      toast.error("Order not found");
      return null;
    }
  } catch (error) {
    toast.error("Error fetching order");
    throw new Error("Failed to fetch order");
  }
};

export const createOrderFromDetail = async (user: IUser, product: IProduct) => 
  try {
    const timestamp = serverTimestamp();

    const orderData: Omit<IOrder, "id" | "createdAt" | "updatedAt"> = {
      user: user,
      status: "waiting" as TOrderStatus,
      isReviewed: false,
      products: [
        {
          product: product,
          quantity: 1,
          price: product.price,
        },
      ],
      totalPrice: product.price,
    };

    await createNotification(
      user.uid,
      notification_messages.order.title,
      notification_messages.order.description,
      `/order`,
    );

    const docRef = await addDoc(collection(db, "order"), {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp,
      userID: user.uid,
    });

    return docRef.id;
  } catch (error) {
    toast.error("Something went wrong while creating the order.");
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: string,
): Promise<void> => {
  try {
    const orderRef = doc(db, "order", orderId);
    await updateDoc(orderRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    toast.error("Failed to update order status");
    throw new Error("Failed to update order status");
  }
};

export const checkout = async (
  order: Omit<IOrder, "id" | "createdAt" | "updatedAt">,
) => {
  try {
    const timestamp = serverTimestamp();

    const orderData: Omit<IOrder, "id" | "createdAt" | "updatedAt"> = {
      user: order.user,
      status: "waiting" as TOrderStatus,
      isReviewed: false,
      products: order.products,
      totalPrice: order.totalPrice,
    };

    const response = await addDoc(collection(db, "order"), {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp,
      userID: order.user.uid,
    });

    return response.id;
  } catch (error) {
    toast.error("Something went wrong while creating the order.");
  }
};

export const orderAgain = async (order: IOrder) => {
  try {
    const timestamp = serverTimestamp();

    const orderData: Omit<IOrder, "id" | "createdAt" | "updatedAt"> = {
      user: order.user,
      status: "waiting" as TOrderStatus,
      isReviewed: false,
      products: order.products,
      totalPrice: order.totalPrice,
    };

    const response = await addDoc(collection(db, "order"), {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp,
      userID: order.user.uid,
    });

    return response.id;
  } catch (error) {
    toast.error("Something went wrong while creating the order.");
  }
};
