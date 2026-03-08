import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return <div>Welcome, {user?.name} </div>;
};

export default Dashboard;
