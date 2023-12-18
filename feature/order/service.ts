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
import { createNotification } from "../notification/service";
import { notification_messages } from "@/constants/notification";
import { FirebaseError } from "firebase/app";
import { TOrderForm } from "./types";

export const getAllOrders = async (status?: TOrderStatus, userId?: string) => {
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
      totalProduct: orderData.totalProduct,
    };
    orders.push(order);
  });

  return orders;
};

export const getOrderById = async (orderId: string) => {
  const orderRef = doc(db, "order", orderId);
  const docSnapshot = await getDoc(orderRef);

  if (!docSnapshot.exists()) {
    throw new FirebaseError("order/not-found", "Order not found");
  }

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
    totalProduct: orderData.totalProduct,
  };

  return order;
};

export const createOrderFromDetail = async (user: IUser, product: IProduct) => {
  const timestamp = serverTimestamp();

  const orderData: TOrderForm = {
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
    totalProduct: 1,
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
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const orderRef = doc(db, "order", orderId);
  await updateDoc(orderRef, {
    status: status,
    updatedAt: serverTimestamp(),
  });
};

export const checkout = async (order: TOrderForm) => {
  const timestamp = serverTimestamp();

  const orderData: TOrderForm = {
    user: order.user,
    status: "waiting" as TOrderStatus,
    isReviewed: false,
    products: order.products,
    totalPrice: order.totalPrice,
    totalProduct: order.totalProduct,
  };

  const response = await addDoc(collection(db, "order"), {
    ...orderData,
    createdAt: timestamp,
    updatedAt: timestamp,
    userID: order.user.uid,
  });

  return response.id;
};

export const orderAgain = async (order: TOrderForm) => {
  const timestamp = serverTimestamp();

  const orderData: TOrderForm = {
    user: order.user,
    status: "waiting" as TOrderStatus,
    isReviewed: false,
    products: order.products,
    totalPrice: order.totalPrice,
    totalProduct: order.totalProduct,
  };

  const response = await addDoc(collection(db, "order"), {
    ...orderData,
    createdAt: timestamp,
    updatedAt: timestamp,
    userID: order.user.uid,
  });

  return response.id;
};
