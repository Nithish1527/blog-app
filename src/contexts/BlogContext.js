import { createContext, useContext, useReducer, useEffect } from 'react';

const BlogContext = createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  loading: false,
  error: null
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call - replace with actual API
    setTimeout(() => {
      const savedPosts = localStorage.getItem('blog-posts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [
        {
          id: 1,
          title: 'Welcome to Our Blog',
          content: 'This is your first blog post. Start writing amazing content!',
          author: 'Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      dispatch({ type: 'SET_POSTS', payload: posts });
    }, 500);
  };

  const createPost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_POST', payload: newPost });
    
    // Save to localStorage
    const updatedPosts = [newPost, ...state.posts];
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
  };

  const updatePost = (id, postData) => {
    const updatedPost = {
      ...postData,
      id,
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    
    // Save to localStorage
    const updatedPosts = state.posts.map(post =>
      post.id === id ? updatedPost : post
    );
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id) => {
    dispatch({ type: 'DELETE_POST', payload: id });
    
    // Save to localStorage
    const updatedPosts = state.posts.filter(post => post.id !== id);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
  };

  return (
    <BlogContext.Provider value={{
      ...state,
      createPost,
      updatePost,
      deletePost,
      fetchPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};