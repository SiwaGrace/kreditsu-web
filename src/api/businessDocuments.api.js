import api from "./axios";

export const listBusinessDocuments = async () => {
  const res = await api.get("/business-documents");
  return res.data;
};

export const getBusinessDocument = async (id) => {
  const res = await api.get(`/business-documents/${id}`);
  return res.data;
};

export const uploadBusinessDocument = async ({ type, file }) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file);

  const res = await api.post("/business-documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateBusinessDocument = async (id, data) => {
  const res = await api.patch(`/business-documents/${id}`, data);
  return res.data;
};

export const deleteBusinessDocument = async (id) => {
  const res = await api.delete(`/business-documents/${id}`);
  return res.data;
};
