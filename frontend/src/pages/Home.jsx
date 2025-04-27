import React from "react";

function Home() {
  return (
    <div className="home-container">
      <h1 className="text-center my-4"></h1>
      <p className="text-center mb-4"></p>
      
      {/* Under Construction Image */}
      <div className="text-center">
        <img 
          src="/under-construction.jpg"  // Image from the public folder
          alt="Under Construction"
          className="img-fluid"  // Bootstrap class for responsiveness
          style={{ maxWidth: "1024px", height: "auto" }}  // Optional styling for image size
        />
      </div>
    </div>
  );
}

export default Home;
