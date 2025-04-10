import React from "react";

const PackageTimeline = ({ updates }) => {
  // Sort updates by timestamp (newest first)
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative border-l-2 border-emerald-500 ml-6 mt-10">
        {sortedUpdates.map((update, index) => {
          // Format the date nicely
          const date = new Date(update.timestamp);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={update.id} className="mb-10 ml-6">
              {/* Timeline dot */}
              <div className="absolute -left-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>

              {/* Content */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <span className="font-bold text-emerald-600 mb-1 sm:mb-0">
                    {update.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formattedDate} • {formattedTime}
                  </span>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium text-emerald-700">
                    Location:
                  </span>{" "}
                  {update.location}
                </p>
                {update.notes && (
                  <p className="text-gray-600 mt-2 text-sm italic">
                    {update.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageTimeline;
