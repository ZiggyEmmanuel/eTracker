import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import PackageList from "../components/admin/PackageList";
import PackageCreate from "../components/admin/PackageCreate";
import PackageEdit from "../components/admin/PackageEdit";
import ContactList from "../components/admin/ContactList";
import ContactDetails from "../components/admin/ContactDetails";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile menu button - only visible on small screens */}
      <button
        className="md:hidden p-4 bg-gray-800 text-white flex items-center"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        Menu
      </button>

      {/* Sidebar - hidden on mobile until toggled */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block absolute md:relative z-10 w-full md:w-64`}
      >
        <SideBar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 min-h-screen w-full">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<PackageList />} />
            <Route path="/packages/create" element={<PackageCreate />} />
            <Route path="/packages/:id/edit" element={<PackageEdit />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/:id" element={<ContactDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
