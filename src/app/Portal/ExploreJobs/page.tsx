"use client";

import * as React from "react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner"; // Import the Spinner component

const organizationData = [
  {
    id: 1,
    name: "Tech Solutions Ltd.",
    type: "IT",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Creative Minds",
    type: "Design",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Build and Grow",
    type: "Construction",
    rating: 3.8,
  },
  {
    id: 4,
    name: "Health First",
    type: "Healthcare",
    rating: 4.7,
  },
];

const ExploreJobs = () => {
  const [loading, setLoading] = React.useState(true); // Loading state for simulating data fetch
  const [organizations, setOrganizations] = React.useState(organizationData); // State to track organizations
  const router = useRouter();

  // Simulate loading delay
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 1 second (simulate data fetch)
    }, 1000);
  }, []);

  return (
    <div className="overflow-auto w-full">
      {loading ? (
        // Show loader while loading
        <div className="flex justify-center items-center py-4">
          <Spinner height="40px" width="40px" />
        </div>
      ) : organizations.length === 0 ? (
        // Show "no organizations" message if no organizations available
        <div className="text-center py-4 text-gray-600">
          <p>No organizations available.</p>
        </div>
      ) : (
        // Show the table when data is loaded
        <table className="table-auto w-full text-center text-lg border border-[#62626280]">
          <thead>
            <tr className="bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white">
              <th className="px-4 py-2">S.NO</th>
              <th className="px-4 py-2">Names</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((organization, index) => (
              <tr key={organization.id}>
                <td className="px-4 py-2 border border-[#62626280]">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-[#62626280]">
                  {organization.name}
                </td>
                <td className="px-4 py-2 border border-[#62626280]">
                  {organization.type}
                </td>
                <td className="px-4 py-2 border border-[#62626280]">
                  {organization.rating.toFixed(1)}
                </td>
                <td className="px-4 py-2 border border-[#62626280]">
                  <Button
                    color="primary"
                    className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                    onClick={() =>
                      router.push(
                        `/Portal/ExploreJobs/OrganizationJobs?organizationId=${organization.id}`
                      )
                    }
                  >
                    Open Position
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExploreJobs;
