import { CURRENCY } from "../data/menu";

// Format a number as Kenyan Shillings, e.g. 480 -> "KES 480".
export const money = (n) => `${CURRENCY} ${n.toLocaleString("en-KE")}`;
