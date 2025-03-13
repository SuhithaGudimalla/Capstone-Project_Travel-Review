import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function UserProfile() {
  return (
    <div className="container mt-4 pb-5" style={{ paddingBottom: '20px' }}>
      <div className="card shadow-lg p-4"> 
        <h2 className="text-center text-primary mb-4">User Dashboard</h2>
        
        <nav className="nav nav-pills justify-content-center">
          <Link to="articles" className="nav-link fs-5 text-dark fw-bold px-4 py-2 bg-light border rounded-pill">
            📄 Travel Reviews
          </Link>
        </nav>

        <div className="mt-4">  
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
