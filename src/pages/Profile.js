import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { posts } = useBlog();

  const userPosts = posts.filter(post => post.author === user?.username);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <h1>{user?.username}</h1>
            <p className="email">{user?.email}</p>
            <div className="stats">
              <span className="stat">
                <strong>{userPosts.length}</strong> Posts Published
              </span>
              <span className="stat">
                Member since {formatDate(user?.joinedAt || new Date())}
              </span>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <Link to="/create" className="create-post-btn">
            Create New Post
          </Link>
        </div>
      </div>

      <div className="profile-content">
        <section className="user-posts">
          <h2>Your Blog Posts</h2>
          
          {userPosts.length === 0 ? (
            <div className="no-posts">
              <p>You haven't written any blog posts yet.</p>
              <Link to="/create" className="create-first-post">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="posts-list">
              {userPosts.map((post) => (
                <div key={post.id} className="post-item">
                  <div className="post-item-header">
                    <h3>
                      <Link to={`/post/${post.id}`} className="post-link">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="post-item-actions">
                      <Link to={`/edit/${post.id}`} className="edit-link">
                        Edit
                      </Link>
                      <Link to={`/post/${post.id}`} className="view-link">
                        View
                      </Link>
                    </div>
                  </div>
                  
                  <div className="post-item-meta">
                    <span className="date">Published {formatDate(post.createdAt)}</span>
                    {post.updatedAt && post.updatedAt !== post.createdAt && (
                      <span className="updated">• Updated {formatDate(post.updatedAt)}</span>
                    )}
                  </div>
                  
                  <div className="post-item-preview">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 && '...'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;