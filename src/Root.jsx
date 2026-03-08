import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/auth/authSlices";
import PageLoader from "./components/common/PageLoader";

const Root = () => {
  const dispatch = useDispatch();
  const { authChecked } = useSelector((state) => state.auth);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!authChecked) dispatch(fetchUser());

    const timer = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(timer);
  }, [dispatch, authChecked]);

  if (!authChecked && !timedOut) return <PageLoader />;

  return <Outlet />;
};

export default Root;
