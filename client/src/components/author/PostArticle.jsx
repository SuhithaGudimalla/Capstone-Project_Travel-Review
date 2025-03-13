import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useNavigate } from 'react-router-dom'

function PostArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { currentUser } = useContext(userAuthorContextObj)
  const navigate = useNavigate()

  async function postArticle(articleObj) {
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    }
    articleObj.authorData = authorData

    articleObj.articleId = Date.now()

    let currentDate = new Date()
    articleObj.dateOfCreation = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString("en-US", { hour12: true })}`
    articleObj.dateOfModification = articleObj.dateOfCreation

    articleObj.comments = []
    articleObj.isArticleActive = true

    let res = await axios.post('http://localhost:4000/author-api/article', articleObj)
    if (res.status === 201) {
      navigate(`/author-profile/${currentUser.email}/articles`)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E3FDFD, #FFE6E6)'
      }}>
      <div className="card shadow-lg border-0" 
        style={{
          width: '90%',
          maxWidth: '600px',
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
        }}>
        
        <h2 className="text-center mb-3" style={{ color: '#0E2954', fontWeight: 'bold' }}>
          ✍️ Share Your Travel Story
        </h2>

        <form onSubmit={handleSubmit(postArticle)}>
          {/* Title Field */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">Title</label>
            <input type="text" id="title" {...register("title")} 
              className="form-control shadow-sm border-0" 
              style={{ borderRadius: '10px', padding: '10px' }} />
          </div>

          {/* Category Selection */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold">Select a Category</label>
            <select id="category" {...register("category")} 
              className="form-select shadow-sm border-0"
              style={{ borderRadius: '10px', padding: '10px' }}>
              <option value="" disabled>-- Select --</option>
              <option value="monument">🏛️ Monument</option>
              <option value="beach">🏖️ Beach</option>
              <option value="mountain">🏔️ Mountains</option>
              <option value="city">🌆 City</option>
              <option value="nature">🌿 Nature</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Content Field */}
          <div className="mb-3">
            <label htmlFor="content" className="form-label fw-bold">Your Story</label>
            <textarea id="content" {...register("content")} 
              className="form-control shadow-sm border-0" rows="6"
              style={{ borderRadius: '10px', padding: '10px' }}>
            </textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn shadow-sm"
              style={{
                background: '#0E2954',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#021D35'}
              onMouseOut={(e) => e.target.style.background = '#0E2954'}>
              ✨ Post Your Story
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostArticle
