import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import PackageStatusBadge from "../components/PackageStatusBadge";
import PackageTimeline from "../components/PackageTimeline";

const PackageDetailPage = () => {
  const { trackingNumber } = useParams(); // Get tracking number from URL
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/packages/track/${trackingNumber}/`
        );
        setPackageData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching package details", error);
        if (error.response?.status === 404) {
          setError("Package not found. Please check your tracking number.");
        } else {
          setError("Unable to load package details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [trackingNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 px-6 py-4">
            <h1 className="text-white text-2xl font-bold">Package Details</h1>
            <p className="text-emerald-100 text-sm mt-1">
              Tracking Number: {packageData.tracking_number}
            </p>
          </div>

          {/* Status and ETA */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <div className="text-sm text-gray-500 mb-1">Current Status</div>
                <div className="flex items-center">
                  <PackageStatusBadge status={packageData.current_status} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sender & Recipient Info */}
          <div className="md:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 pb-2 border-b border-gray-200">
                Sender
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">{packageData.sender_name}</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 pb-2 border-b border-gray-200">
                Recipient
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">{packageData.receiver_name}</p>
                {packageData.receiver_email && (
                  <p className="text-gray-700 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {packageData.receiver_email}
                  </p>
                )}
                {packageData.receiver_phone && (
                  <p className="text-gray-700 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {packageData.receiver_phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 pb-2 border-b border-gray-200">
                Shipping Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date Created</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(packageData.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="text-gray-800 font-medium">
                    {packageData.destination}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Package Type</p>
                  <p className="text-gray-800 font-medium">
                    {packageData.package_type || "Standard Package"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-gray-800 font-medium">
                    {packageData.weight ? `${packageData.weight} kg` : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Shipping Method</p>
                  <p className="text-gray-800 font-medium">
                    {packageData.shipping_method || "Standard Shipping"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6 text-emerald-800">
            Tracking History
          </h3>
          {packageData.updates && packageData.updates.length > 0 ? (
            <PackageTimeline updates={packageData.updates} />
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-gray-500 font-medium">
                No tracking updates available yet.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Check back later for updates on your package.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
