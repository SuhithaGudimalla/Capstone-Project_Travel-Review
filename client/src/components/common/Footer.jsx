import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #e3fdfd, #ffe6fa)",
        color: "#333",
        padding: "40px 0",
        fontSize: "16px",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-left">
          {/* Information Section */}
          <div className="col-md-3 mb-4">
            <h6 style={sectionTitleStyle}>Information</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" style={linkStyle}>Pages</a></li>
              <li><a href="#" style={linkStyle}>Our Team</a></li>
              <li><a href="#" style={linkStyle}>Features</a></li>
              <li><a href="#" style={linkStyle}>Pricing</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-md-3 mb-4">
            <h6 style={sectionTitleStyle}>Resources</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" style={linkStyle}>Wikipedia</a></li>
              <li><a href="#" style={linkStyle}>React Blog</a></li>
              <li><a href="#" style={linkStyle}>Terms & Services</a></li>
              <li><a href="#" style={linkStyle}>Angular Dev</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-md-2 mb-4">
            <h6 style={sectionTitleStyle}>Help</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="#" style={linkStyle}>Sign Up</a></li>
              <li><a href="#" style={linkStyle}>Login</a></li>
              <li><a href="#" style={linkStyle}>Terms of Service</a></li>
              <li><a href="#" style={linkStyle}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-4 text-center">
            <h6 style={sectionTitleStyle}>Contact Us</h6>
            <p className="mt-3">Need help? Reach out anytime!</p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>📞 +91 9999999999</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="text-center mt-4" style={{ borderTop: "1px solid #bbb", paddingTop: "15px" }}>
        <p style={{ marginBottom: "0", fontSize: "14px", color: "#666" }}>
          2024 © VNR, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

// Inline Styles
const sectionTitleStyle = {
  fontWeight: "bold",
  borderBottom: "2px solid #555",
  paddingBottom: "5px",
  color: "#222",
};

const linkStyle = {
  color: "#444",
  textDecoration: "none",
  display: "block",
  padding: "5px 0",
  transition: "0.3s",
};

export default Footer;
