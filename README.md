# Blog App - React Authentication & CRUD

A modern, production-grade React blog application with JWT authentication, protected routes, and full CRUD operations for blog posts.

## 🌟 Features

- **Authentication System**: JWT-based login/signup with localStorage persistence
- **Protected Routes**: Route protection requiring authentication
- **CRUD Operations**: Create, read, update, delete blog posts
- **Responsive Design**: Mobile-first design with CSS Grid and Flexbox
- **Context API**: Global state management for authentication and blog data
- **User Profiles**: Personal dashboard with user's blog posts
- **Real-time Validation**: Form validation with error handling
- **Modern UI/UX**: Clean, professional design with smooth animations

## 🛠 Technologies Used

- **React 19**: Latest React with hooks and functional components
- **React Router DOM**: Navigation and protected routing
- **Context API + useReducer**: Global state management
- **localStorage**: Data persistence simulation
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JWT Simulation**: Token-based authentication (simulated)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with auth status
│   └── ProtectedRoute.js  # Route protection component
├── contexts/
│   ├── AuthContext.js     # Authentication state management
│   └── BlogContext.js     # Blog posts state management
├── pages/
│   ├── Home.js           # Blog posts listing page
│   ├── Login.js          # User login form
│   ├── Signup.js         # User registration form
│   ├── CreatePost.js     # New blog post creation
│   ├── EditPost.js       # Blog post editing
│   ├── PostDetail.js     # Individual blog post view
│   └── Profile.js        # User profile and posts dashboard
└── App.js               # Main app with routing setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 💡 Usage

### Authentication
- **Sign Up**: Create a new account with username, email, and password
- **Login**: Access your account with username and password
- **Auto-login**: Persistent sessions using localStorage

### Blog Management
- **View Posts**: Browse all blog posts on the home page
- **Create Post**: Write new blog posts (authenticated users only)
- **Edit Posts**: Modify your own blog posts
- **Delete Posts**: Remove your blog posts with confirmation
- **View Details**: Read full blog posts with formatted content

### User Features
- **Profile Page**: View your published posts and account info
- **Protected Routes**: Access creation and editing features when logged in
- **Responsive Design**: Seamless experience on desktop and mobile

## 🔐 Authentication Flow

1. **JWT Simulation**: Uses simulated JWT tokens stored in localStorage
2. **Route Protection**: ProtectedRoute component guards authenticated pages
3. **Persistent Login**: Automatic login restoration on page refresh
4. **Secure Logout**: Complete session cleanup and token removal

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for tablets and desktops
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Performance**: Optimized images and efficient CSS

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional aesthetic
- **Smooth Animations**: CSS transitions and hover effects
- **Loading States**: User feedback during operations
- **Error Handling**: Comprehensive error messages and validation
- **Accessibility**: Semantic HTML and keyboard navigation

## 🚀 Production Build

Create an optimized production build:

```bash
npm run build
```

The build folder will contain the optimized static files ready for deployment.

## 📝 Development Notes

### State Management
- **AuthContext**: Manages user authentication state, login/logout functions
- **BlogContext**: Handles blog posts CRUD operations and data persistence
- **useReducer**: Complex state updates with predictable state transitions

### Data Persistence
- **localStorage**: Simulates backend persistence for demo purposes
- **JSON Serialization**: Proper data serialization for storage
- **Error Handling**: Graceful fallbacks for storage failures

### Security Considerations
- **Input Validation**: Client-side form validation and sanitization
- **XSS Prevention**: Proper content escaping and validation
- **Route Protection**: Authentication checks on sensitive routes

## 🔄 Future Enhancements

- Backend API integration
- Real JWT authentication
- Database persistence
- Image upload functionality
- Comment system
- Search and filtering
- User roles and permissions
- Email verification
- Password reset functionality

## 🐛 Known Issues

- Simulated authentication (no real backend)
- Data stored in localStorage (not production-ready)
- No server-side validation

## 📄 License

This project is created for educational and portfolio purposes.

## 🤝 Contributing

This is a portfolio project. Feel free to fork and modify for your own use.

---

**Built with ❤️ using React** - A production-grade blog application demonstrating modern React development practices.