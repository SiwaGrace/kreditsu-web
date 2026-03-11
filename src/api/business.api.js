import api from "./axios";

// Get authenticated user's business
export const getBusiness = async () => {
  const res = await api.get("/business");
  return res.data;
};

// Create a business
export const createBusiness = async (data) => {
  const res = await api.post("/business", data);
  return res.data;
};

// Update a business
export const updateBusiness = async (data) => {
  const res = await api.patch("/business", data);
  return res.data;
};

// Public: Get all published businesses (paginated)
export const getBusinesses = async (page = 1) => {
  const res = await api.get("/businesses", { params: { page } });
  return res.data;
};

// Public: Get a single business by slug
export const getBusinessBySlug = async (slug) => {
  const res = await api.get(`/businesses/${slug}`);
  return res.data;
};
