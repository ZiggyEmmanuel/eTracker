import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axios";

const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContactDetails();
  }, [id]);

  const fetchContactDetails = async () => {
    try {
      const response = await axios.get(`/api/contacts/${id}/`);
      setContact(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load contact details");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Contact Message Details
        </h2>
        <button
          onClick={() => navigate("/admin/contacts")}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Back to List
        </button>
      </div>

      {contact && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-lg text-gray-900">{contact.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg text-gray-900">{contact.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Subject</h3>
            <p className="mt-1 text-lg text-gray-900">{contact.subject}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Message</h3>
            <p className="mt-1 text-lg text-gray-900 whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Received On</h3>
            <p className="mt-1 text-lg text-gray-900">
              {new Date(contact.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
