import { Outlet } from "react-router-dom";
import Menu from "./menu";
import { useEffect } from "react";
import { enableKeplr } from "../keplr";
import AccountInfo from "@/components/account_info";
import { Toaster } from "@/components/ui/toaster";

function Root() {
  useEffect(() => {
    window.onload = async () => {
      await enableKeplr();
    }
  }, []);

  return (
    <div>
      <header className="flex flex-row justify-between py-2 px-4 border-b border-slate-200">
        <Menu />
        <AccountInfo />
      </header>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default Root;
