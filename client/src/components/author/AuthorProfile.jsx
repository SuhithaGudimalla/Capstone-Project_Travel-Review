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
          width: '85%',
          maxWidth: '850px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '50px 40px',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
          margin: '40px 0',
        }}
      >
        {/* Header */}
        <h2
          className="mb-4"
          style={{ color: '#555', fontWeight: 'bold', letterSpacing: '1px' }}
        >
          🌿 Author Dashboard 🌿
        </h2>

        {/* Navigation Bar */}
        <div
          className="d-flex justify-content-center p-3"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '15px',
            marginBottom: '20px',
          }}
        >
          <NavLink
            to="articles"
            className="btn"
            style={{
              background: '#03254A', // Deep navy blue
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '12px 20px',
              borderRadius: '10px',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.07)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            📖 View reviews
          </NavLink>

          <NavLink
            to="article"
            className="btn"
            style={{
              background: '#03254A', // Deep navy blue
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '12px 20px',
              borderRadius: '10px',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.07)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            ✏️ Add New reviews
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
