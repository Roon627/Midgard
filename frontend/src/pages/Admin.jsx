import React from "react";

const Admin = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <p className="text-center lead">
        Welcome to the admin dashboard. You can manage your jobs, view submissions, and more!
      </p>
      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-primary mx-2">Manage Jobs</button>
        <button className="btn btn-secondary mx-2">View Submissions</button>
      </div>
    </div>
  );
};

export default Admin;
