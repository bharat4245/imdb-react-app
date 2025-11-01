import React from "react";

const Banner = () => {
  return (
    <div
      className="h-[20vh] md-h[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://www.koimoi.com/wp-content/new-galleries/2015/11/ghayal-once-again-movie-poster-3.jpg)`,
      }}
    >
      <div className="text-white text-2xl text-center w-full bg-gray-900/60 p-4">
        Ghayal - Once Again
      </div>
    </div>
  );
};

export default Banner;
