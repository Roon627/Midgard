import React from "react";

function Home() {
  return (
    <div className="home-container text-center px-3">
      <h1 className="my-4">Welcome to Our Portal</h1>
      <p className="mb-4">We’re working hard to bring you something amazing!</p>

      {/* Under Construction Image */}
      <div className="image-wrapper">
        <img 
          src="/under-construction.jpg"  // Public folder path
          alt="Under Construction"
          className="under-construction-image"
        />
      </div>
    </div>
  );
}

export default Home;
