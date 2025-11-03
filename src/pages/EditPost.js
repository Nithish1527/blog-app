import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import './PostForm.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = useBlog();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = posts.find(p => p.id === parseInt(id));
    if (foundPost) {
      if (foundPost.author !== user.username) {
        navigate('/');
        return;
      }
      setPost(foundPost);
      setFormData({
        title: foundPost.title,
        content: foundPost.content
      });
    } else {
      setError('Post not found');
    }
  }, [id, posts, user.username, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.title.length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    if (formData.content.length < 20) {
      setError('Content must be at least 20 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updatedPost = {
        title: formData.title.trim(),
        content: formData.content.trim()
      };

      await updatePost(parseInt(id), updatedPost);
      navigate(`/post/${id}`);
    } catch (err) {
      setError('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/post/${id}`);
  };

  if (!post && !error) {
    return <div className="loading">Loading...</div>;
  }

  if (error && !post) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="post-form-container">
      <div className="post-form-card">
        <h2>Edit Blog Post</h2>
        
        <form onSubmit={handleSubmit} className="post-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your blog post title"
              disabled={loading}
              maxLength={100}
            />
            <small className="form-help">
              {formData.title.length}/100 characters
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post content here..."
              disabled={loading}
              rows={15}
              maxLength={5000}
            />
            <small className="form-help">
              {formData.content.length}/5000 characters
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;