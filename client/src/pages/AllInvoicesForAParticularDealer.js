import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import AllInvoicesForAParticularDealerTable from "../components/tables/AllInvoicesForAParticularDealerTable";

function AllInvoicesForAParticularDealer() {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <AllInvoicesForAParticularDealerTable></AllInvoicesForAParticularDealerTable>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
}

export default AllInvoicesForAParticularDealer;
