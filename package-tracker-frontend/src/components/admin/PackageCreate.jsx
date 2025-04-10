import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const PackageCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sender_name: "",
    receiver_name: "",
    receiver_email: "",
    receiver_phone: "",
    destination: "",
    weight: "",
    package_type: "Standard",
    shipping_method: "Standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const csrfResponse = await axios.get("/api/csrf/");
      const token = csrfResponse.data.csrfToken;

      // Make the POST request with CSRF token
      await axios.post("/api/admin/packages/", formData, {
        headers: {
          "X-CSRFToken": token,
        },
        withCredentials: true, // Important for sending cookies
      });
      navigate("/admin"); // Redirect to package list after creation
    } catch (error) {
      console.error("Error creating package:", error);
      alert(
        "Failed to create package: " +
          (error.response?.data?.detail || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Create New Package</h2>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sender Information */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Sender Name
              </label>
              <input
                type="text"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Receiver Information */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Receiver Name
              </label>
              <input
                type="text"
                name="receiver_name"
                value={formData.receiver_name}
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
                value={formData.receiver_email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Receiver Phone
              </label>
              <input
                type="tel"
                name="receiver_phone"
                value={formData.receiver_phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="+1 (234) 567-8901"
              />
            </div>

            {/* Package Details */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Package Type
              </label>
              <select
                name="package_type"
                value={formData.package_type}
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
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Shipping Method
              </label>
              <select
                name="shipping_method"
                value={formData.shipping_method}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Standard">Standard Shipping</option>
                <option value="Express">Express Shipping</option>
                <option value="Next Day">Next Day Delivery</option>
                <option value="Two Day">Two Day Delivery</option>
                <option value="International">International Shipping</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto flex justify-center items-center"
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
                  Creating...
                </>
              ) : (
                "Create Package"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageCreate;
