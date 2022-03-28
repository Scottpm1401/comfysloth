export const addPurchase = (bill) => {
  return {
    type: "addPurchase",
    payload: bill,
  };
};
