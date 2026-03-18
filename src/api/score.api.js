import api from "./axios";

export const fetchScoreRequest = async () => {
  const res = await api.get("/score");
  return res.data;
};
