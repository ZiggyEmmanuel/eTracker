import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";

const PackageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingTracking, setIsUpdatingTracking] = useState(false);
  const currentDateTime = new Date().toISOString().slice(0, 16);
  const [trackingUpdate, setTrackingUpdate] = useState({
    location: "",
    status: "",
    notes: "",
    timestamp: currentDateTime,
  });

  const STATUS_CHOICES = [
    ["Pending", "Pending"],
    ["In Transit", "In Transit"],
    ["Out for Delivery", "Out for Delivery"],
    ["Delivered", "Delivered"],
    ["On Hold", "On Hold"],
    ["Returned", "Returned"],
  ];

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/packages/${id}/`);
      setPackageData(response.data);
    } catch (error) {
      console.error("Error fetching package:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const csrfResponse = await axios.get("/api/csrf/");
      const token = csrfResponse.data.csrfToken;

      await axios.put(`/api/packages/${id}/`, packageData, {
        headers: {
          "X-CSRFToken": token,
        },
        withCredentials: true,
      });
      navigate("/admin");
    } catch (error) {
      console.error("Error updating package:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackingUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingTracking(true);
    try {
      const csrfResponse = await axios.get("/api/csrf/");
      const token = csrfResponse.data.csrfToken;

      const updateData = {
        ...trackingUpdate,
        timestamp: new Date(trackingUpdate.timestamp).toISOString(),
      };

      await axios.post(`/api/admin/packages/${id}/update_status/`, updateData, {
        headers: {
          "X-CSRFToken": token,
        },
        withCredentials: true,
      });

      fetchPackage();
      const currentDateTime = new Date().toISOString().slice(0, 16);
      setTrackingUpdate({
        location: "",
        status: "",
        notes: "",
        timestamp: currentDateTime,
      });
    } catch (error) {
      console.error("Error adding tracking update:", error);
    } finally {
      setIsUpdatingTracking(false);
    }
  };

  const handleChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTrackingChange = (e) => {
    setTrackingUpdate({
      ...trackingUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteUpdate = async (updateId) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      try {
        const csrfResponse = await axios.get("/api/csrf/");
        const token = csrfResponse.data.csrfToken;

        await axios.delete(`/api/admin/tracking-updates/${updateId}/`, {
          headers: {
            "X-CSRFToken": token,
          },
          withCredentials: true,
        });
        fetchPackage();
      } catch (error) {
        console.error("Error deleting tracking update:", error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );

  if (!packageData)
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Package not found or error loading data.</p>
        <button
          onClick={() => navigate("/admin")}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Return to Dashboard
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Package Information Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Package Information
          </h2>
          <div className="mb-6 p-4 bg-gray-50 rounded shadow-sm">
            <p className="mb-2">
              <strong className="text-emerald-700">Tracking Number:</strong>{" "}
              {packageData.tracking_number}
            </p>
            <p>
              <strong className="text-emerald-700">Created At:</strong>{" "}
              {new Date(packageData.created_at).toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    name="sender_name"
                    value={packageData.sender_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    name="receiver_name"
                    value={packageData.receiver_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Receiver Email
                  </label>
                  <input
                    type="email"
                    name="receiver_email"
                    value={packageData.receiver_email || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Receiver Phone
                  </label>
                  <input
                    type="tel"
                    name="receiver_phone"
                    value={packageData.receiver_phone || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Package Type
                  </label>
                  <select
                    name="package_type"
                    value={packageData.package_type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="Standard">Standard Package</option>
                    <option value="Express">Express Package</option>
                    <option value="Heavy">Heavy Package</option>
                    <option value="Fragile">Fragile Package</option>
                    <option value="Document">Document</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="weight"
                    value={packageData.weight || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Shipping Method
                  </label>
                  <select
                    name="shipping_method"
                    value={packageData.shipping_method}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="Standard">Standard Shipping</option>
                    <option value="Express">Express Shipping</option>
                    <option value="Next Day">Next Day Delivery</option>
                    <option value="Two Day">Two Day Delivery</option>
                    <option value="International">
                      International Shipping
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Current Status
                  </label>
                  <select
                    name="current_status"
                    value={packageData.current_status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {STATUS_CHOICES.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={packageData.destination}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors flex justify-center items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Package"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tracking Updates Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Tracking Updates
          </h2>

          {/* Add New Update Form */}
          <div className="mb-8 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Add New Update</h3>
            <form onSubmit={handleTrackingUpdate} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={trackingUpdate.location}
                  onChange={handleTrackingChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={trackingUpdate.status}
                  onChange={handleTrackingChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                  placeholder="Enter status update"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="timestamp"
                  value={trackingUpdate.timestamp}
                  onChange={handleTrackingChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={trackingUpdate.notes}
                  onChange={handleTrackingChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="3"
                  placeholder="Optional notes"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors flex justify-center items-center"
                disabled={isUpdatingTracking}
              >
                {isUpdatingTracking ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Update"
                )}
              </button>
            </form>
          </div>

          {/* Tracking History */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tracking History</h3>
            {packageData.updates && packageData.updates.length > 0 ? (
              packageData.updates.map((update, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">
                        {update.status}
                      </p>
                      <p className="text-gray-600">{update.location}</p>
                      {update.notes && (
                        <p className="text-gray-500 mt-2 text-sm">
                          {update.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-row sm:flex-col items-start sm:items-end mt-2 sm:mt-0 justify-between sm:justify-start">
                      <p className="text-sm text-gray-500 order-2 sm:order-1">
                        {update.formatted_timestamp}
                      </p>
                      <button
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="text-red-500 hover:text-red-700 transition-colors order-1 sm:order-2 sm:mt-2"
                        title="Delete update"
                        aria-label="Delete update"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No tracking updates yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageEdit;
