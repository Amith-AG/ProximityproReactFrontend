import Navbar from "./component/ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./component/ui/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
