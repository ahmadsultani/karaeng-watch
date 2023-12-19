type TDateVariant = "short" | "medium" | "long" | "full";

/**
 * @param price price number
 * @returns formatted price with Rp. prefix
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "code",
  }).format(price);
};

/**
 * @param num number
 * @returns return shorter number
 */
export const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + "k";
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else {
    return (num / 1000000000).toFixed(1) + "B";
  }
};
/**
 * @brief format date to "nice" string
 * @param date date string, example: 2021-08-01T00:00:00.000Z or just 2021-08-01
 * @param variant variant of date,  example: short, medium, long, full
 * @returns formatted date
 */
export const formatDate = (date: string, variant: TDateVariant) => {
  return new Intl.DateTimeFormat("en-UK", {
    dateStyle: variant,
  }).format(new Date(date));
};

/**
 * @param date date string, example: 2021-08-01T00:00:00.000Z or just 2021-08-01
 * @returns formatted date to hour:minute
 */
export const formatToHour = (date: string) => {
  return new Intl.DateTimeFormat("en-UK", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
};

/**
 * @param date date string, example: 2021-08-01T00:00:00.000Z or just 2021-08-01
 * @returns formatted date to hour:minute if today, yesterday if yesterday, else full date
 */
export const formatToDay = (date: string) => {
  const currentDate = new Date();
  const providedDate = new Date(date);

  currentDate.setHours(0, 0, 0, 0);
  providedDate.setHours(0, 0, 0, 0);

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  if (providedDate.getTime() === currentDate.getTime()) {
    return formatToHour(date); // Format to hour:minute
  } else if (providedDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return formatDate(date, "full");
  }
};
