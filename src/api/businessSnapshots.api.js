import api from "./axios";

export const listBusinessSnapshots = async () => {
  const res = await api.get("/business-snapshots");
  return res.data;
};

export const getBusinessSnapshotByMonth = async (month) => {
  const res = await api.get(`/business-snapshots/${month}`);
  return res.data;
};

export const generateBusinessSnapshot = async (month = null) => {
  const res = await api.post("/business-snapshots/generate", {
    month,
  });
  return res.data;
};
