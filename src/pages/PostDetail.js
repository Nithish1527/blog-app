import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = useBlog();
  const { user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundPost = posts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id, posts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(parseInt(id));
      navigate('/');
    } catch (err) {
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isAuthor = user && post && user.username === post.author;

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="post-not-found">
          <h2>Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <header className="post-header">
          <Link to="/" className="back-link">← Back to Posts</Link>
          
          <div className="post-title-section">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="author">By {post.author}</span>
              <span className="date">Published on {formatDate(post.createdAt)}</span>
              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <span className="updated">Updated on {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>

          {isAuthor && (
            <div className="post-actions">
              <Link to={`/edit/${post.id}`} className="edit-btn">
                Edit Post
              </Link>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="delete-btn"
                disabled={loading}
              >
                Delete Post
              </button>
            </div>
          )}
        </header>

        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="confirm-delete-btn"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;