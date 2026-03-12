import api from "./axios";

// List sales for the authenticated user's business
export const listSales = async () => {
  const res = await api.get("/sales");
  return res.data;
};

// Create a new sale
export const createSale = async (data) => {
  const res = await api.post("/sales", data);
  return res.data;
};

