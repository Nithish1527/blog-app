import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user: JSON.parse(user)
        }
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (username, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call - replace with actual API
    setTimeout(() => {
      // Check stored users or use default credentials
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find(u => u.username === username && u.password === password);
      
      if (user || (username === 'demo' && password === 'password')) {
        const userData = user || { 
          id: 1, 
          username: 'demo', 
          email: 'demo@example.com',
          joinedAt: new Date().toISOString()
        };
        const token = 'fake-jwt-token-' + Date.now();
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: userData, token }
        });
      } else {
        dispatch({
          type: 'AUTH_ERROR',
          payload: 'Invalid credentials'
        });
      }
    }, 1000);
  };

  const signup = (username, email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call - replace with actual API
    setTimeout(() => {
      // Check if username already exists
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = storedUsers.find(u => u.username === username);
      
      if (existingUser) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: 'Username already exists'
        });
        return false;
      }
      
      const userData = { 
        id: Date.now(), 
        username, 
        email, 
        password,
        joinedAt: new Date().toISOString()
      };
      const token = 'fake-jwt-token-' + Date.now();
      
      // Store user in users list
      storedUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      // Store current session
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: userData, token }
      });
      return true;
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};