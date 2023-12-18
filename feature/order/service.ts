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
  runTransaction,
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

  if (userId) queries.push(where("user.uid", "==", userId));

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
      totalPrice: orderData.totalPrice,
      totalProduct: orderData.totalProduct,
    };
    orders.push(order);
  });

  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
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
    isReviewed: false,
    status: "waiting",
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
  if (!order.user.emailVerified) {
    throw new FirebaseError(
      "auth/email-not-verified",
      "Your email is not verified",
    );
  }

  const timestamp = serverTimestamp();

  const orderData: TOrderForm = {
    user: order.user,
    products: order.products,
    totalPrice: order.totalPrice,
    totalProduct: order.totalProduct,
  };

  const response = await runTransaction(db, async (transaction) => {
    for (const product of order.products) {
      const productRef = doc(db, "product", product.product.id);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        throw new Error("Product not found");
      }

      const productData = productSnapshot.data();

      if (productData.stock < product.quantity) {
        throw new Error("Product stock is not enough");
      }

      const cartRef = doc(
        db,
        "cart",
        `${order.user.uid}_${product.product.id}`,
      );
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        transaction.delete(cartRef);
      }

      transaction.update(productRef, {
        stock: productData.stock - product.quantity,
        sold: productData.sold + product.quantity,
      });
    }

    const orderRef = collection(db, "order");
    const response = await addDoc(orderRef, {
      ...orderData,
      isReviewed: false,
      status: "waiting",
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await createNotification(
      orderData.user.uid,
      notification_messages.order.title,
      notification_messages.order.description,
      `/order`,
    );

    return response;
  });

  return response.id;
};
