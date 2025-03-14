import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  async function getArticles() {
    try {
      const token = await getToken();
      let res = await axios.get('http://localhost:4000/author-api/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setError('');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again.');
    }
  }

  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container-fluid py-5" 
      style={{ 
        background: 'linear-gradient(135deg, #EAFDF8, #F6F1F1)', 
        minHeight: '100vh',
        maxWidth: '1200px', // Increased width
        margin: '0 auto'
      }}>
      
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#03254A' }}>
        📖 Latest Travel Reviews
      </h2>

      {error && 
        <p className="display-6 text-center mt-4 text-danger">{error}</p>
      }

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4">
        {articles.map((articleObj) => (
          <div className="col d-flex align-items-stretch" key={articleObj.articleId}>
            <div className="card shadow-lg border-0 w-100"
              style={{ 
                borderRadius: '15px', 
                overflow: 'hidden', 
                transition: '0.3s', 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}>

              {/* ✅ Author Section */}
              <div className="d-flex align-items-center px-4 py-3">
                <img src={articleObj.authorData.profileImageUrl}
                  width="50px"
                  className="rounded-circle border shadow-sm me-2"
                  alt="Author" />
                <p className="m-0 fw-bold text-dark">{articleObj.authorData.nameOfAuthor}</p>
              </div>

              {/* ✅ Article Image Below Author */}
              {articleObj.imageUrl && (
                <img src={`http://localhost:4000${articleObj.imageUrl}`} 
                  alt="Article Cover" 
                  className="card-img-top"
                  style={{ 
                    height: '250px', 
                    objectFit: 'cover', 
                    borderTopLeftRadius: '10px', 
                    borderTopRightRadius: '10px' 
                  }} 
                />
              )}

              <div className="card-body d-flex flex-column">
                {/* ✅ Article Title */}
                <h5 className="card-title fw-bold text-dark">{articleObj.title}</h5>

                {/* ✅ Article Content Preview */}
                <p className="card-text flex-grow-1 text-muted" style={{ fontSize: '1rem' }}>
                  {articleObj.content.substring(0, 100) + "...."}
                </p>

                {/* ✅ Read More Button */}
                <button className="btn mt-auto"
                  onClick={() => gotoArticleById(articleObj)}
                  style={{
                    background: '#03254A',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    transition: '0.3s',
                    fontWeight: 'bold',
                  }}
                  onMouseOver={(e) => e.target.style.background = '#021D35'}
                  onMouseOut={(e) => e.target.style.background = '#03254A'}>
                  Read More
                </button>
              </div>

              {/* ✅ Footer */}
              <div className="card-footer bg-white border-0 text-center">
                <small className="text-muted">
                  Last updated on {articleObj.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
