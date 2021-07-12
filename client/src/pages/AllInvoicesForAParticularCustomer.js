import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import AllInvoicesForAParticularCustomerTable from "../components/tables/AllInvoicesForAParticularCustomerTable";

function AllInvoicesForAParticularCustomer() {
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
      <AllInvoicesForAParticularCustomerTable></AllInvoicesForAParticularCustomerTable>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
}

export default AllInvoicesForAParticularCustomer;
