import api from "./axios";

export const fetchScore = async () => {
  const res = await api.get("/score");
  console.log(res.data);
  return res.data;
};
