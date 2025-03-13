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

  // Update currentArticle state when state changes
  useEffect(() => {
    setCurrentArticle(state);
  }, [state]);

  // Enable edit mode
  function enableEdit() {
    setEditArticleStatus(true);
  }

  // Save modified article
  async function onSave(modifiedArticle) {
    try {
      const articleAfterChanges = { ...state, ...modifiedArticle };
      const token = await getToken();
      const currentDate = new Date();
      articleAfterChanges.dateOfModification = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format

      let res = await axios.put(
        `http://localhost:4000/author-api/article/${articleAfterChanges.articleId}`,
        articleAfterChanges,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.message === 'article modified') {
        setEditArticleStatus(false);
        navigate(`/author-profile/articles/${state.articleId}`, { state: res.data.payload });
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  }

  // Add comment
  async function addComment(commentObj) {
    try {
      commentObj.nameOfUser = currentUser.firstName;
      let res = await axios.put(`http://localhost:4000/user-api/comment/${currentArticle.articleId}`, commentObj);

      if (res.data.message === 'comment added') {
        setCommentStatus('Comment added successfully!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  // Delete article
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

  // Restore article
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
          {/* Article Header */}
          <div className="d-flex justify-content-between">
            <div className="mb-5 author-block w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
              <div>
                <p className="display-3 me-4">{state.title}</p>
                <span className="py-3">
                  <small className="text-secondary me-4">Created on: {state.dateOfCreation}</small>
                  <small className="text-secondary me-4">Modified on: {state.dateOfModification}</small>
                </span>
              </div>
              {/* Author Details */}
              <div className="author-details text-center">
                <img src={state.authorData.profileImageUrl} width="60px" className="rounded-circle" alt="" />
                <p>{state.authorData.nameOfAuthor}</p>
              </div>
            </div>

            {/* Edit & Delete Buttons */}
            {currentUser.role === 'author' && (
              <div className="d-flex me-3">
                <button className="me-2 btn btn-light" onClick={enableEdit}>
                  <FaEdit className="text-warning" />
                </button>
                {state.isArticleActive ? (
                  <button className="me-2 btn btn-light" onClick={deleteArticle}>
                    <MdDelete className="text-danger fs-4" />
                  </button>
                ) : (
                  <button className="me-2 btn btn-light" onClick={restoreArticle}>
                    <MdRestore className="text-info fs-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Article Content */}
          <p className="lead mt-3 article-content" style={{ whiteSpace: 'pre-line' }}>
            {state.content}
          </p>

          {/* User Comments */}
          <div className="comments my-4">
            {state.comments.length === 0 ? (
              <p className="display-3">No comments yet...</p>
            ) : (
              state.comments.map((commentObj) => (
                <div key={commentObj._id}>
                  <p className="user-name">{commentObj?.nameOfUser}</p>
                  <p className="comment">{commentObj?.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Form */}
          <h6>{commentStatus}</h6>
          {currentUser.role === 'user' && (
            <form onSubmit={handleSubmit(addComment)}>
              <input type="text" {...register('comment')} className="form-control mb-4" />
              <button className="btn btn-success">Add a comment</button>
            </form>
          )}
        </>
      ) : (
        // Edit Article Form
        <form onSubmit={handleSubmit(onSave)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" defaultValue={state.title} {...register('title')} />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label">
              Select a category
            </label>
            <select {...register('category')} id="category" className="form-select" defaultValue={state.category}>
              <option value="programming">Programming</option>
              <option value="AI&ML">AI & ML</option>
              <option value="database">Database</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea {...register('content')} className="form-control" id="content" rows="10" defaultValue={state.content}></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ArticleByID;
