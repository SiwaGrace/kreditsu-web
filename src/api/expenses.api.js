import api from "./axios";

// List expenses for the authenticated user's business
export const listExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data;
};

// Create a new expense
export const createExpense = async (data) => {
  const res = await api.post("/expenses", data);
  return res.data;
};

