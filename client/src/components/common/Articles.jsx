import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

function Articles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { getToken } = useAuth()

  async function getArticles() {
    const token = await getToken()
    let res = await axios.get('http://localhost:4000/author-api/articles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.data.message === 'articles') {
      setArticles(res.data.payload)
      setError('')
    } else {
      setError(res.data.message)
    }
  }

  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj })
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <div className='container py-5' 
      style={{ 
        background: 'linear-gradient(135deg, #EAFDF8, #F6F1F1)', 
        minHeight: '100vh' 
      }}>
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#03254A' }}>
        📖 Latest Travel Reviews
      </h2>

      {error.length !== 0 && 
        <p className='display-6 text-center mt-4 text-danger'>{error}</p>
      }

      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          articles.map((articleObj) => (
            <div className='col' key={articleObj.articleId}>
              <div className="card shadow-lg border-0 h-100"
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  transition: '0.3s', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  backdropFilter: 'blur(10px)'
                }}>
                
                <div className="card-body d-flex flex-column">
                  {/* Author Section */}
                  <div className="d-flex align-items-center mb-2">
                    <img src={articleObj.authorData.profileImageUrl}
                      width='45px'
                      className='rounded-circle border shadow-sm me-2'
                      alt="" />
                    <p className='m-0'>
                      <small className='text-muted fw-bold'>{articleObj.authorData.nameOfAuthor}</small>
                    </p>
                  </div>

                  {/* Article Title */}
                  <h5 className='card-title fw-bold' style={{ color: '#03254A' }}>{articleObj.title}</h5>

                  {/* Article Content Preview */}
                  <p className='card-text flex-grow-1 text-muted' style={{ fontSize: '0.95rem' }}>
                    {articleObj.content.substring(0, 80) + "...."}
                  </p>

                  {/* Read More Button */}
                  <button className='btn' 
                    onClick={() => gotoArticleById(articleObj)}
                    style={{
                      background: '#03254A',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      transition: '0.3s',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#021D35'}
                    onMouseOut={(e) => e.target.style.background = '#03254A'}>
                    Read More
                  </button>
                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-0">
                  <small className="text-muted">
                    Last updated on {articleObj.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Articles
