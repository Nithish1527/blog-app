import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { posts } = useBlog();
  const { user } = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Latest Blog Posts</h1>
        {user && (
          <Link to="/create" className="create-post-btn">
            Create New Post
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No blog posts yet. {user ? 'Be the first to create one!' : 'Please login to create a post.'}</p>
          {!user && (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/signup" className="auth-link">Sign Up</Link>
            </div>
          )}
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <h2>
                  <Link to={`/post/${post.id}`} className="post-title">
                    {post.title}
                  </Link>
                </h2>
                <div className="post-meta">
                  <span className="author">By {post.author}</span>
                  <span className="date">{formatDate(post.createdAt)}</span>
                </div>
              </div>
              
              <div className="post-content">
                <p>{truncateContent(post.content)}</p>
              </div>
              
              <div className="post-actions">
                <Link to={`/post/${post.id}`} className="read-more">
                  Read More →
                </Link>
                {user && user.username === post.author && (
                  <Link to={`/edit/${post.id}`} className="edit-link">
                    Edit
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;