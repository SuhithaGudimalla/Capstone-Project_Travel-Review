import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdRestore } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

function ArticleByID() {
  const { state } = useLocation();
  const { currentUser } = useContext(userAuthorContextObj);
  const [editArticleStatus, setEditArticleStatus] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [currentArticle, setCurrentArticle] = useState(state);
  const [commentStatus, setCommentStatus] = useState('');

  useEffect(() => {
    setCurrentArticle(state);
  }, [state]);

  function enableEdit() {
    setEditArticleStatus(true);
  }

  async function onSave(modifiedArticle) {
    try {
      const articleAfterChanges = { ...state, ...modifiedArticle };
      const token = await getToken();
      const currentDate = new Date();
      articleAfterChanges.dateOfModification = currentDate.toLocaleDateString('en-GB');

      let res = await axios.put(
        `http://localhost:4000/author-api/article/${articleAfterChanges.articleId}`,
        articleAfterChanges,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.message === 'article modified') {
        setEditArticleStatus(false);
        setCurrentArticle(res.data.payload);
        navigate(`/author-profile/articles/${state.articleId}`, { state: res.data.payload });
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  }

  async function addComment(commentObj) {
    try {
      commentObj.nameOfUser = currentUser.firstName;
      let res = await axios.put(`http://localhost:4000/user-api/comment/${currentArticle.articleId}`, commentObj);

      if (res.data.message === 'comment added') {
        setCommentStatus('Comment added successfully!');
        setCurrentArticle((prev) => ({
          ...prev,
          comments: [...prev.comments, commentObj],
        }));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  async function deleteArticle() {
    try {
      state.isArticleActive = false;
      let res = await axios.put(`http://localhost:4000/author-api/articles/${state.articleId}`, state);

      if (res.data.message === 'article deleted or restored') {
        setCurrentArticle(res.data.payload);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

  async function restoreArticle() {
    try {
      state.isArticleActive = true;
      let res = await axios.put(`http://localhost:4000/author-api/articles/${state.articleId}`, state);

      if (res.data.message === 'article deleted or restored') {
        setCurrentArticle(res.data.payload);
      }
    } catch (error) {
      console.error('Error restoring article:', error);
    }
  }

  return (
    <div className="container">
      {editArticleStatus === false ? (
        <>
          <div className="row justify-content-center mt-5">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className="card shadow-lg">
                <div className="card-body bg-light p-5">
                  
                  {/* ✅ Author Details & Timestamps ABOVE the Image */}
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={state.authorData.profileImageUrl} 
                        width="60px" 
                        className="rounded-circle me-3" 
                        alt="Author" 
                      />
                      <div>
                        <h5 className="fw-bold mb-0">{state.authorData.nameOfAuthor}</h5>
                        <small className="text-secondary">Created: {state.dateOfCreation} | Modified: {state.dateOfModification}</small>
                      </div>
                    </div>
                    <h2 className="text-primary">{state.title}</h2>
                  </div>

                  {/* ✅ Article Image BELOW the Author Info */}
                  {state.imageUrl && (
                    <img 
                      src={`http://localhost:4000${state.imageUrl}`} 
                      alt="Article Cover" 
                      className="img-fluid mt-3 mb-4"
                      style={{ width: '100%', borderRadius: '10px', objectFit: 'cover', maxHeight: '400px' }} 
                    />
                  )}

                  <p className="mt-4 fs-5" style={{ whiteSpace: 'pre-line' }}>{state.content}</p>

                  {currentUser.role === 'author' && (
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-outline-warning me-2" onClick={enableEdit}>
                        <FaEdit />
                      </button>
                      {state.isArticleActive ? (
                        <button className="btn btn-outline-danger me-2" onClick={deleteArticle}>
                          <MdDelete />
                        </button>
                      ) : (
                        <button className="btn btn-outline-info" onClick={restoreArticle}>
                          <MdRestore />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <h4>Comments</h4>
                    {currentArticle.comments.length === 0 ? (
                      <p className="text-muted">No comments yet...</p>
                    ) : (
                      currentArticle.comments.map((commentObj, index) => (
                        <div key={index} className="border-bottom py-2">
                          <p className="fw-bold mb-1">{commentObj?.nameOfUser}</p>
                          <p className="text-muted">{commentObj?.comment}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <h6 className="text-success">{commentStatus}</h6>
                  {currentUser.role === 'user' && (
                    <form onSubmit={handleSubmit(addComment)} className="mt-3">
                      <input type="text" {...register('comment')} className="form-control mb-3" placeholder="Add a comment..." />
                      <button className="btn btn-success">Post Comment</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10 col-md-11 col-sm-12">
            <div className="card shadow-lg">
              <div className="card-body bg-light p-5">
                <form onSubmit={handleSubmit(onSave)}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" defaultValue={state.title} {...register('title')} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input type="text" className="form-control" id="imageUrl" defaultValue={state.imageUrl} {...register('imageUrl')} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea {...register('content')} className="form-control" id="content" rows="8" defaultValue={state.content}></textarea>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleByID;
