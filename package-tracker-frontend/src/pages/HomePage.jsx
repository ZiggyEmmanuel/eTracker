import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import PackageStatusBadge from "../components/PackageStatusBadge";

const HomePage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrackPackage = async () => {
    setIsLoading(true);
    setError(null);

    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `/api/packages/track/${trackingNumber}/`
      );
      setPackageData(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Package not found. Please check your tracking number.");
      } else {
        setError(
          "Unable to track package at this time. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/package/${packageData.tracking_number}`);
  };

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/parcel.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // This creates a parallax-like effect
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <h1 className="text-4xl md:text-5xl text-amber-500 font-bold mb-6 text-center px-4">
          Track Your Package
        </h1>
        <div className="flex flex-col items-center gap-4 w-full px-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter Tracking Number..."
              className="p-3 border-4 border-gray-300 rounded-lg w-full sm:w-72 text-emerald-950 text-lg"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
              onClick={handleTrackPackage}
              disabled={isLoading}
            >
              {isLoading ? (
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
                  Tracking...
                </>
              ) : (
                "Track"
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg w-full max-w-md text-center">
              {error}
            </div>
          )}
        </div>
      </div>

      {packageData && (
        <div className="p-6 md:p-10 text-center bg-white shadow-lg rounded-lg max-w-2xl mx-auto -mt-16 relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-emerald-800">
            Package Details
          </h2>
          <div className="space-y-3 mb-6">
            <p>
              <strong className="text-emerald-700">Tracking Number:</strong>{" "}
              {packageData.tracking_number}
            </p>
            <p>
              <strong className="text-emerald-700">Sender:</strong>{" "}
              {packageData.sender_name}
            </p>
            <p>
              <strong className="text-emerald-700">Receiver:</strong>{" "}
              {packageData.receiver_name}
            </p>
            {packageData.receiver_email && (
              <p>
                <span className="font-medium text-emerald-700">Email:</span>{" "}
                {packageData.receiver_email}
              </p>
            )}
            {packageData.receiver_phone && (
              <p>
                <span className="font-medium text-emerald-700">Phone:</span>{" "}
                {packageData.receiver_phone}
              </p>
            )}
            <p>
              <strong className="text-emerald-700">Destination:</strong>{" "}
              {packageData.destination}
            </p>
            <p>
              <strong className="text-emerald-700">Status:</strong>{" "}
              <PackageStatusBadge status={packageData.current_status} />
            </p>
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            View Full Details
          </button>
        </div>
      )}

      <div className="p-6 md:p-16 text-center bg-emerald-50">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
          About Our Service
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-700">
          We provide reliable and efficient package tracking services worldwide,
          ensuring your shipments are monitored every step of the way with
          real-time updates and notifications.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-800">
              Real-time Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your packages with instant updates on their location and
              status.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-800">
              Detailed History
            </h3>
            <p className="text-gray-600">
              View the complete journey of your package with timestamp and
              location data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-800">
              Delivery Notifications
            </h3>
            <p className="text-gray-600">
              Receive alerts when your package status changes or upon successful
              delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
