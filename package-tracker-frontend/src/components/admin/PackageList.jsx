import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add this function in the PackageList component
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this package? This action cannot be undone."
      )
    ) {
      try {
        // Get CSRF token
        const csrfResponse = await axios.get("/api/csrf/");
        const token = csrfResponse.data.csrfToken;

        // Make delete request with CSRF token
        await axios.delete(`/api/admin/packages/${id}/`, {
          headers: {
            "X-CSRFToken": token,
          },
          withCredentials: true,
        });

        // Refresh the packages list after deletion
        fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
        alert(
          "Failed to delete package: " +
            (error.response?.data?.detail || error.message)
        );
      }
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("/api/packages/");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Package List</h2>
        <Link
          to="/admin/packages/create"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto text-center"
        >
          Create Package
        </Link>
      </div>

      {/* Mobile view: Card layout */}
      <div className="md:hidden space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Tracking #:</span>
              <span>{pkg.tracking_number}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Sender:</span>
              <span>{pkg.sender_name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Receiver:</span>
              <span>{pkg.receiver_name}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Status:</span>
              <span>{pkg.current_status}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <Link
                to={`/admin/packages/${pkg.id}/edit`}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit/Update
              </Link>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view: Table layout */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left">Tracking Number</th>
              <th className="px-6 py-3 text-left">Sender</th>
              <th className="px-6 py-3 text-left">Receiver</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{pkg.tracking_number}</td>
                <td className="px-6 py-4">{pkg.sender_name}</td>
                <td className="px-6 py-4">{pkg.receiver_name}</td>
                <td className="px-6 py-4">{pkg.current_status}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/packages/${pkg.id}/edit`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit/Update
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {packages.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">
            No packages found. Create your first package.
          </p>
        </div>
      )}
    </div>
  );
};

export default PackageList;
