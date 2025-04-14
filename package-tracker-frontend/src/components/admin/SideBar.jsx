import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="w-full md:w-64 min-h-screen bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        {/* Close button - only visible on mobile */}
        <button
          className="md:hidden text-white"
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className="block p-2 hover:bg-gray-700 rounded transition-colors"
              onClick={closeSidebar}
            >
              Packages
            </Link>
          </li>
          <li>
            <Link
              to="/admin/packages/create"
              className="block p-2 hover:bg-gray-700 rounded transition-colors"
              onClick={closeSidebar}
            >
              Create Package
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contacts"
              className="block p-2 hover:bg-gray-700 rounded transition-colors"
              onClick={closeSidebar}
            >
              Contact Messages
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
