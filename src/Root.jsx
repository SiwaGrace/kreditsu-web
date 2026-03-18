import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/auth/authSlices";
import { fetchBusiness } from "./features/businessSlices";
import { fetchScore } from "./features/scoreSlices";
import PageLoader from "./components/common/PageLoader";

const Root = () => {
  const dispatch = useDispatch();
  const { authChecked, isAuthenticated } = useSelector((state) => state.auth);
  const { businessChecked } = useSelector((state) => state.business);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(fetchUser());
      // only fetch business if user is authenticated
      if (result.meta.requestStatus === "fulfilled") {
        const biz = await dispatch(fetchBusiness());
        if (biz.meta.requestStatus === "fulfilled") {
          dispatch(fetchScore());
        }
      }
    };

    if (!authChecked) init();

    const timer = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(timer);
  }, [dispatch, authChecked]);

  // wait for both checks before rendering
  const ready = authChecked && (!isAuthenticated || businessChecked);

  if (!ready && !timedOut) return <PageLoader />;

  return <Outlet />;
};

export default Root;
