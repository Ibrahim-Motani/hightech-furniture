import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import AddInvoiceForm from '../components/forms/AddInvoiceForm';

function AddInvoice() {
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
          <AddInvoiceForm></AddInvoiceForm>
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    );
}

export default AddInvoice;
