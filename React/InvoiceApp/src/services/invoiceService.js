import { Invoice } from "../data/models"

export const getInvoice = () => {
  return Invoice;
}

export function computeTotal(items) {
  return items
    .map(item=>item.price*item.quantity)
    .reduce((ac, curr)=>ac+curr, 0);
}