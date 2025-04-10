import React from "react";

const AboutPage = () => (
  <div className="bg-gradient-to-b from-emerald-50 to-white">
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
          About Us
        </h1>
        <div className="h-1 w-24 bg-amber-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            We provide reliable and efficient package tracking services
            worldwide, ensuring that your shipments are monitored every step of
            the way with real-time updates and notifications.
          </p>
          <p className="text-gray-700">
            Our goal is to create transparency in the shipping process, giving
            both senders and receivers peace of mind with accurate, timely
            information about their packages.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-emerald-100 p-6 rounded-lg shadow-md">
          <div
            className="h-64 rounded bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/shipping.jpg')",
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg hover:bg-emerald-50 transition-colors">
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
            <h3 className="text-xl font-semibold mb-2 text-emerald-700">
              Real-time Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your packages with instant updates on their location and
              status.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg hover:bg-emerald-50 transition-colors">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-700">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Your package information is protected with enterprise-grade
              security.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg hover:bg-emerald-50 transition-colors">
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
            <h3 className="text-xl font-semibold mb-2 text-emerald-700">
              Instant Notifications
            </h3>
            <p className="text-gray-600">
              Receive alerts when your package status changes or upon successful
              delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">Our Team</h2>
          <p className="text-gray-700 mb-4">
            Our dedicated team of logistics experts and technology professionals
            work tirelessly to ensure that our tracking system provides
            accurate, timely information to our users.
          </p>
          <p className="text-gray-700">
            With decades of combined experience in shipping and logistics, we
            understand the importance of reliable package tracking for
            businesses and individuals alike.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">
            Our Coverage
          </h2>
          <p className="text-gray-700 mb-4">
            We provide comprehensive tracking services across multiple carriers
            and shipping methods, ensuring that no matter how your package is
            sent, you can track it with ease.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              International
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              Domestic
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              Express
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              Standard
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              Economy
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
