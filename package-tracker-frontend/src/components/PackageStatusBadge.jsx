import React from "react";

const PackageStatusBadge = ({ status }) => {
  // Define colors for different statuses - updating to new color scheme
  const statusStyles = {
    Pending: "bg-amber-100 text-amber-800 border-amber-200",
    "In Transit": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Out for Delivery": "bg-purple-100 text-purple-800 border-purple-200",
    Delivered: "bg-green-100 text-green-800 border-green-200",
    Delayed: "bg-red-100 text-red-800 border-red-200",
    Returned: "bg-gray-100 text-gray-800 border-gray-200",
    // Add more statuses as needed
  };

  // Use default styling if status isn't in our predefined list
  const styling =
    statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styling} border inline-flex items-center`}
    >
      {/* Status indicator dot */}
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          styling.includes("amber")
            ? "bg-amber-500"
            : styling.includes("emerald")
            ? "bg-emerald-500"
            : styling.includes("purple")
            ? "bg-purple-500"
            : styling.includes("green")
            ? "bg-green-500"
            : styling.includes("red")
            ? "bg-red-500"
            : "bg-gray-500"
        }`}
      ></span>
      {status}
    </span>
  );
};

export default PackageStatusBadge;
