import React from 'react';

const CustomShimmer = () => {
  return (
    <div className="w-full flex justify-center items-center -mt-[1em] p-0">
      <div className="w-[600px] h-[250px] flex flex-col justify-center items-center space-y-3">
        <div className="w-full px-4 flex flex-col space-y-3">
          <div className="w-full h-6 shimmer"></div>
          <div className="w-full h-6 shimmer"></div>
          <div className="w-full h-6 shimmer"></div>
          <br></br>
          <div className="w-full h-10 shimmer mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomShimmer;
