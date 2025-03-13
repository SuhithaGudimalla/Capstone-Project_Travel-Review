import React from 'react'
import { SignIn } from '@clerk/clerk-react'

function SIgnin() {
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{
        background: 'linear-gradient(135deg, #C7EEF5, #EAFDF8)',
        color: '#333'
      }}
    >
      <div 
        className="p-4 shadow-lg" 
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          minWidth: '350px'
        }}
      >
        <h3 className="text-center mb-3" style={{ fontWeight: 'bold', color: '#333' }}>
          Welcome Back 👋
        </h3>
        <SignIn />
      </div>
    </div>
  )
}

export default SIgnin
