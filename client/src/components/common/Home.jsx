import { useContext, useEffect, useState } from 'react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSelectRole(e) {
    setError('');
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;

    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:4000/author-api/author', currentUser);
        let { message, payload } = res.data;
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem('currentuser', JSON.stringify(payload));
        } else {
          setError(message);
        }
      }

      if (selectedRole === 'user') {
        res = await axios.post('http://localhost:4000/user-api/user', currentUser);
        let { message, payload } = res.data;
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem('currentuser', JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === 'user' && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === 'author' && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #3E93A7, #C7EEF5)',
        padding: '50px 20px',
      }}
    >
      <div
        className="shadow-lg text-center p-5"
        style={{
          width: '90%',
          maxWidth: '800px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        {!isSignedIn ? (
          <div>
            <h2 className="mb-3" style={{ fontWeight: 'bold', color: '#333' }}>
              🌍 Welcome to the Travel Review Hub!
            </h2>
            <p className="lead" style={{ color: '#555' }}>
              Discover authentic travel experiences from around the world! At WanderVista, we bring you honest reviews, insider tips, and breathtaking destinations to help you plan the perfect trip.
            </p>
            <ul className="list-unstyled">
              <li>📍 Explore Top Destinations – From iconic landmarks to hidden gems.</li>
              <li>📝 Read & Share Reviews – Get real experiences from fellow travelers.</li>
              <li>📸 Inspiring Travel Stories – See the world through amazing photos and blogs.</li>
            </ul>
            <p className="mt-3 fw-bold" style={{ color: '#222' }}>
              Start your journey with trusted insights and expert recommendations. Let’s make every trip unforgettable! ✈️✨
            </p>
          </div>
        ) : (
          <div>
            {/* Profile Section */}
            <div
              className="d-flex flex-column align-items-center p-4"
              style={{
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={user.imageUrl}
                width="100px"
                className="rounded-circle mb-3"
                alt="Profile"
              />
              <h4 className="fw-bold">{user.firstName}</h4>
              <p className="lead" style={{ color: '#444' }}>{user.emailAddresses[0].emailAddress}</p>
            </div>

            {/* Role Selection */}
            <p className="mt-4 lead fw-bold">Select Role</p>
            {error.length !== 0 && (
              <p className="text-danger fs-5">{error}</p>
            )}
            <div className="d-flex justify-content-center gap-4 mt-3">
              <div
                className="form-check"
                style={{
                  padding: '12px 20px',
                  border: '2px solid #03254A',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.target.style.background = '#03254A')}
                onMouseOut={(e) => (e.target.style.background = 'transparent')}
              >
                <input
                  type="radio"
                  name="role"
                  id="author"
                  value="author"
                  className="form-check-input"
                  onChange={onSelectRole}
                />
                <label
                  htmlFor="author"
                  className="form-check-label fw-bold"
                  style={{ marginLeft: '8px', color: '#03254A' }}
                >
                  ✍️ Author
                </label>
              </div>

              <div
                className="form-check"
                style={{
                  padding: '12px 20px',
                  border: '2px solid #03254A',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.target.style.background = '#03254A')}
                onMouseOut={(e) => (e.target.style.background = 'transparent')}
              >
                <input
                  type="radio"
                  name="role"
                  id="user"
                  value="user"
                  className="form-check-input"
                  onChange={onSelectRole}
                />
                <label
                  htmlFor="user"
                  className="form-check-label fw-bold"
                  style={{ marginLeft: '8px', color: '#03254A' }}
                >
                  👤 User
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
