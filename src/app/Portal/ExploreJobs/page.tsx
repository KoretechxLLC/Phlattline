"use client";

import * as React from "react";
import { Button } from "@/app/components/button-sidebar";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

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
  const [loading, setLoading] = React.useState(true);
  const [organizations, setOrganizations] = React.useState(organizationData);
  const router = useRouter();

  // Simulate loading delay
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="overflow-auto w-full">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner height="40px" width="40px" />
        </div>
      ) : organizations.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          <p>No organizations available.</p>
        </div>
      ) : (
        <React.Fragment>
          <div className="w-full text-center justify-center text-sm">
            {/* Header */}
            <div className="text-lg bg-gradient-to-b from-[#62626280] to-[#2D2C2C80] text-white flex">
              <div className="flex-1 px-4 py-3 whitespace-nowrap">S.NO</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap">Names</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap">Type</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap">Rating</div>
              <div className="flex-1 px-4 py-3 whitespace-nowrap">Action</div>
            </div>
            {/* Organizations Data */}
            <div className="flex flex-col ">
              {organizations.map((organization, index) => (
                <React.Fragment key={organization.id}>
                  <div className="flex items-center text-center px-4 py-3 ">
                    <div className="flex-1">{index + 1}</div>
                    <div className="flex-1">{organization.name}</div>
                    <div className="flex-1">{organization.type}</div>
                    <div className="flex-1">
                      {organization.rating.toFixed(1)}
                    </div>
                    <div className="flex-1">
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
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ExploreJobs;
