import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import travel_logo from "../../assets/travel_logo.jpg";
import { useClerk, useUser } from "@clerk/clerk-react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";

const Header = () => {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <nav style={navStyle}>
      <div style={logoContainerStyle}>
        <Link to="/">
          <img src={travel_logo} alt="Logo" style={logoStyle} />
        </Link>
      </div>

      <ul style={navListStyle}>
        {!isSignedIn ? (
          <>
            <li>
              <Link to="signin" style={navLinkStyle}>Sign In</Link>
            </li>
            <li>
              <Link to="signup" style={navLinkStyle}>Sign Up</Link>
            </li>
          </>
        ) : (
          <div style={userContainerStyle}>
            <div style={userProfileStyle}>
              <img src={user.imageUrl} style={userImageStyle} alt="User" />
              <p style={userRoleStyle}>{currentUser?.role}</p>
            </div>
            <p style={userNameStyle}>{user.firstName}</p>
            <button onClick={handleSignOut} style={signOutButtonStyle}>
              Sign Out
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

// Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 50px",
  background: "linear-gradient(to right, #e3fdfd, #ffe6fa)",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  width: "60px",
  borderRadius: "10px",
};

const navListStyle = {
  listStyleType: "none",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  margin: 0,
};

const navLinkStyle = {
  color: "#333",
  textDecoration: "none",
  fontSize: "18px",
  padding: "10px 15px",
  borderRadius: "5px",
  transition: "0.3s",
  background: "rgba(255, 255, 255, 0.6)",
};

const userContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const userProfileStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
};

const userImageStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "2px solid #ffb6c1",
};

const userRoleStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000", // Black text with no box
  marginLeft: "5px",
};

const userNameStyle = {
  color: "#444",
  fontSize: "16px",
};

const signOutButtonStyle = {
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "0.3s",
};

export default Header;
