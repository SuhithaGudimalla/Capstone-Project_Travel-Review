import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AuthorProfile() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(to right,#3E93A7,#C7EEF5)',
        minHeight: '100vh',
        padding: '60px 20px',
      }}
    >
      <div
        className="shadow-lg text-center"
        style={{
          width: '90%',  // Increased width for more space
          maxWidth: '1000px',  // Maximum width increased
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(12px)',
          padding: '60px 50px',  // Increased padding for better structure
          boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
          margin: '50px 0',
        }}
      >
        {/* Header */}
        <h2
          className="mb-4"
          style={{ color: '#444', fontWeight: 'bold', letterSpacing: '1px' }}
        >
          🌿 Author Dashboard 🌿
        </h2>

        {/* Navigation Bar */}
        <div
          className="d-flex justify-content-center p-3"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '12px',
            boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '20px', // Increased spacing between buttons
            marginBottom: '25px',
          }}
        >
          <NavLink
            to="articles"
            className="btn"
            style={{
              background: '#03254A', // Deep navy blue
              color: 'white',
              fontWeight: 'bold',
              fontSize: '17px',
              padding: '14px 24px',
              borderRadius: '12px',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.08)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            📖 View Reviews
          </NavLink>

          <NavLink
            to="article"
            className="btn"
            style={{
              background: '#03254A',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '17px',
              padding: '14px 24px',
              borderRadius: '12px',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.08)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            ✏️ Add New Reviews
          </NavLink>
        </div>

        {/* Content Section */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
