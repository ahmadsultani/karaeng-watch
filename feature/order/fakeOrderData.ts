import { IOrder } from "@/interfaces/order";
import { IProduct } from "@/interfaces/product";

export const order: IOrder[] = [
  {
    id: "randomId",
    status: "done",
    isReviewed: true,
    products: [
      {
        name: "Cart 1 First Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Second Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Third Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
    ] as IProduct[],
  },
  {
    id: "randomId",
    status: "delivered",
    isReviewed: false,
    products: [
      {
        name: "Cart 1 First Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Second Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Third Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
    ] as IProduct[],
  },
  {
    id: "randomId",
    status: "waiting",
    isReviewed: false,
    products: [
      {
        name: "Cart 1 First Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Second Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Third Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
    ] as IProduct[],
  },
  {
    id: "randomId",
    status: "canceled",
    isReviewed: false,
    products: [
      {
        name: "Cart 1 First Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Second Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Third Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
    ] as IProduct[],
  },
  {
    id: "randomId",
    status: "delivered",
    isReviewed: false,
    products: [
      {
        name: "Cart 1 First Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Second Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
      {
        name: "Third Item",
        brand: {
          name: "Hamilton",
        },
        price: 43460000,
      },
    ] as IProduct[],
  },
];
