import { Outlet } from "react-router-dom";
import Menu from "./menu";
import { useEffect } from "react";
import { enableKeplr } from "../keplr";

function Root() {
  useEffect(() => {
    window.onload = async () => {
      await enableKeplr();
    }
  }, []);

  return (
    <div>
      <Menu />
      <Outlet />
    </div>
  );
}

export default Root;
