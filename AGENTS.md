# AGENTS.md - TRAE College Portal Dashboard

## Project Overview

**Project Name:** TRAE Dashboard (College Portal)  
**Type:** React-based College Management System  
**Purpose:** A comprehensive web application for managing college operations including student attendance, academic performance, fee management, and administrative tasks.

### Technology Stack
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.8.2
- **Styling:** Tailwind CSS 3.2.7
- **Build Tool:** Create React App (react-scripts 5.0.1)
- **HTTP Client:** Axios 1.3.4
- **Charts/Graphs:** Recharts 2.15.4
- **Icons:** Heroicons React 1.0.6
- **Authentication:** JWT (jwt-decode 3.1.2)

---

## Project Structure

```
dashboard/
├── build/                      # Production build output
├── node_modules/              # Dependencies
├── public/                    # Static assets
│   └── index.html            # HTML entry point
├── src/
│   ├── components/           # Reusable components
│   │   └── common/
│   │       ├── DashboardCard.js    # Card component for dashboard metrics
│   │       ├── Sidebar.js          # Navigation sidebar component
│   │       └── ThemeToggle.js      # Dark/light mode toggle
│   ├── context/              # React Context providers
│   │   ├── AuthContext.js    # Authentication state management
│   │   └── ThemeContext.js   # Theme (dark/light mode) management
│   ├── pages/                # Page components
│   │   ├── AdminDashboard.js      # Administrator dashboard
│   │   ├── HODDashboard.js        # Head of Department dashboard
│   │   ├── Landing.js             # Public landing page
│   │   ├── Login.js               # Login page
│   │   ├── Signup.js              # Registration page
│   │   ├── StudentDashboard.js    # Student portal
│   │   └── TeacherDashboard.js    # Teacher portal
│   ├── App.js                # Main app component with routing
│   ├── index.js              # React app entry point
│   ├── index.css             # Global styles and Tailwind directives
│   └── reportWebVitals.js    # Performance monitoring
├── .prettierrc               # Prettier configuration
├── AGENTS.md                 # This file - AI agent documentation
├── package.json              # Dependencies and scripts
└── tailwind.config.js        # Tailwind CSS configuration
```

---

## Frequently Used Commands

### Development
```bash
npm start
```
Runs the app in development mode at http://localhost:3000 with hot reload.

### Build
```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.

### Linting & Type Checking
```bash
# Currently no dedicated lint command - ESLint runs with react-scripts
# For future: consider adding dedicated lint scripts
```

### Eject (Not Recommended)
```bash
npm run eject
```
One-way operation that removes Create React App abstraction. Avoid unless necessary.

---

## Code Conventions & Style

### General Guidelines
- **Code Style:** Follow the existing Prettier configuration (2 spaces, no tabs)
- **Component Structure:** Functional components with React Hooks
- **File Naming:** PascalCase for components (e.g., `StudentDashboard.js`)
- **Import Order:** 
  1. React imports first
  2. Third-party library imports
  3. Internal component imports
  4. Context imports
  5. Utility/helper imports

### React Patterns
- **Components:** Use functional components with hooks (no class components)
- **State Management:** 
  - Context API for global state (AuthContext, ThemeContext)
  - `useState` for local component state
  - `useEffect` for side effects and lifecycle events
  - `useContext` for consuming context values
- **Routing:** React Router DOM v6 with nested routes
- **Inline Components:** Page-specific sub-components defined within the same file

### Styling Approach
- **Primary:** Tailwind CSS utility classes
- **Dark Mode:** `dark:` prefix classes with `class` mode in Tailwind config
- **Custom Classes:** Defined in `src/index.css` using `@layer components`:
  - `.card` - Standard card wrapper with white/dark-gray background, rounded corners, shadow
  - `.btn-primary` - Primary action button (blue, white text)
  - `.btn-secondary` - Secondary action button (gray)
  - `.input-field` - Standard form input styling with focus states

### Color Scheme
- **Primary Colors:** Blue shades (defined in tailwind.config.js)
  - Primary-50: `#f0f9ff`
  - Primary-100: `#e0f2fe`
  - Primary-200: `#bae6fd`
  - Primary-300: `#7dd3fc`
  - Primary-400: `#38bdf8`
  - Primary-500: `#0ea5e9` (main)
  - Primary-600: `#0284c7` (hover states)
  - Primary-700: `#0369a1`
  - Primary-800: `#075985`
  - Primary-900: `#0c4a6e`
- **Dark Mode:** Enabled with `darkMode: 'class'` configuration
- **Theme Storage:** Persisted in localStorage as `'theme'` key

---

## Architecture & Key Features

### Authentication System

#### Implementation Details
- **Type:** JWT-based authentication with localStorage
- **Context Provider:** `AuthContext.js` manages authentication state
- **Token Storage:** localStorage keys:
  - `token`: JWT authentication token
  - `userRole`: User's role (student/teacher/hod/admin)
- **Protected Routes:** `ProtectedRoute` component in `App.js` guards dashboard routes

#### User Roles & Routes
```javascript
{
  student: '/student-dashboard/*',
  teacher: '/teacher-dashboard/*',
  hod: '/hod-dashboard/*',
  admin: '/admin-dashboard/*'
}
```

#### AuthContext API
```javascript
{
  currentUser: {
    id: string,
    name: string,
    email: string,
    role: 'student' | 'teacher' | 'hod' | 'admin'
  },
  login: (token, user) => void,    // Sets token, updates state, redirects
  logout: () => void,               // Removes token, clears state, redirects to home
  loading: boolean                  // Loading state during initial auth check
}
```

#### Token Handling Flow
1. On app load, `AuthContext` checks localStorage for `token`
2. If token exists, decode using `jwt-decode`
3. Check expiration: `decoded.exp * 1000 < Date.now()`
4. If expired → logout, else → set `currentUser`
5. Protected routes check token presence before rendering

#### Mock Authentication (Current)
```javascript
// Login.js - Mock implementation
const userData = {
  id: '1',
  name: 'Rahul Sharma',
  email: email,
  role: role  // from dropdown
};
const token = 'mock.jwt.token'; // In production, comes from API
login(token, userData);
```

### Theme System

#### Implementation
- **Provider:** `ThemeContext.js` manages dark/light mode state
- **Toggle Component:** `ThemeToggle.js` renders sun/moon icon button
- **Persistence:** Saves preference to localStorage as `'theme'`
- **Application:** Adds/removes `dark` class on `document.documentElement`

#### ThemeContext API
```javascript
{
  darkMode: boolean,              // Current theme state
  toggleTheme: () => void         // Toggles theme and updates DOM/localStorage
}
```

#### Dark Mode Implementation Pattern
```javascript
// Always use dark: prefix for dark mode styles
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

---

## User Roles & Dashboards

### Student Dashboard Features

#### Overview Section
- **Metrics Display:**
  - Attendance percentage (with color coding)
  - Upcoming assignments count
  - Pending fees amount
  - New announcements count
- **Customization:**
  - Dashboard color scheme selector (blue/purple/green/orange)
  - Widget layout reordering (drag-and-drop ready)
  - Personalized greeting based on time of day
  - Preferences saved to localStorage

#### Attendance Tracking
- Subject-wise attendance breakdown
- Visual status indicators (Present/Absent/Late)
- Percentage calculation per subject
- Overall attendance percentage
- Color-coded warnings for low attendance

#### Timetable Management
- Weekly class schedule view
- Day-wise class listings
- Subject, time, and location details
- Current day highlighting

#### Fee Management
- Payment history tracking
- Pending fees display
- Payment status indicators
- Downloadable fee receipts (future)

#### Academic Performance
- Subject-wise grades
- GPA calculation
- Performance trend charts (using Recharts)
- Semester-wise breakdown

#### Documents Section
- Download capabilities:
  - Admit cards
  - Marksheets
  - ID cards
  - Fee receipts
- Upload functionality:
  - Assignment submissions
  - Document verification uploads

### Teacher Dashboard Features

#### Overview Section
- **Key Metrics:**
  - Total students count
  - Average attendance percentage
  - Pending assessments count
  - Today's scheduled classes
- **Quick Actions:**
  - Mark attendance button
  - Create assessment button
  - View student list
  - Post announcement

#### Attendance Management
- Class selection dropdown
- Date picker for attendance entry
- Student list with present/absent toggle
- Bulk actions (mark all present/absent)
- Attendance history view

#### Student Management
- Complete student list with filters:
  - By class/section
  - By attendance percentage
  - By academic performance
  - Search by name/ID
- Student detail view
- Performance tracking

#### Assessments & Grading
- Create new assessments (assignments/quizzes/exams)
- Grade submissions
- Rubric-based evaluation
- Bulk grading capabilities
- Grade distribution analytics

#### Timetable View
- Personal teaching schedule
- Class-wise breakdown
- Room allocation details
- Substitute management (future)

#### Announcements
- Post notices for students
- Target specific classes/sections
- Priority levels (normal/urgent)
- Announcement history

### HOD Dashboard Features

#### Department Overview
- Department-wide statistics
- Faculty performance metrics
- Student enrollment numbers
- Course completion rates

#### Department Management
- Oversee multiple classes
- Monitor teacher activities
- Course allocation
- Resource management

#### Reporting
- Generate departmental reports
- Performance analytics
- Attendance summaries
- Academic progress tracking

#### Faculty Management
- View teacher profiles
- Monitor teaching loads
- Performance evaluations
- Leave management

### Admin Dashboard Features

#### System Overview
- College-wide statistics
- User count by role
- System health metrics
- Recent activity logs

#### User Management
- Create/edit/delete users (students/teachers/HODs)
- Role assignment
- Password reset
- Bulk user import (CSV)

#### Course Management
- Create/modify courses
- Semester setup
- Subject allocation
- Academic calendar management

#### System Settings
- College configuration
- Feature toggles
- Email templates
- Backup & restore

#### Analytics & Reporting
- Comprehensive dashboards
- Custom report generation
- Data export (PDF/Excel)
- Visualization charts

---

## Common Components

### DashboardCard Component

**Location:** `src/components/common/DashboardCard.js`

**Purpose:** Reusable metric display card for dashboards

**Props:**
```javascript
{
  title: string,        // Card title (e.g., "Attendance")
  value: string|number, // Metric value to display
  icon: ReactNode,      // Icon component (usually SVG)
  color: string,        // Tailwind color name (e.g., "blue", "green")
  onClick: function     // Optional click handler for navigation
}
```

**Usage Example:**
```javascript
<DashboardCard 
  title="Attendance" 
  value="85%" 
  color="green"
  icon={<CheckCircleIcon />}
  onClick={() => navigate('/student-dashboard/attendance')}
/>
```

**Features:**
- Hover shadow effect
- Dark mode support
- Responsive layout
- Click navigation support

### Sidebar Component

**Location:** `src/components/common/Sidebar.js`

**Purpose:** Navigation sidebar for all dashboard views

**Props:**
```javascript
{
  menuItems: Array<{
    name: string,     // Display name
    path: string,     // Route path
    icon: ReactNode   // Icon component
  }>
}
```

**Features:**
- Dynamic navigation based on user role
- User avatar with initial letter
- User name and role display
- Active route highlighting
- Logout button at bottom
- Fixed position, full height
- Smooth transitions
- Dark mode compatible

**Usage Example:**
```javascript
const menuItems = [
  { name: 'Overview', path: '/student-dashboard', icon: <HomeIcon /> },
  { name: 'Attendance', path: '/student-dashboard/attendance', icon: <CheckIcon /> }
];

<Sidebar menuItems={menuItems} />
```

### ThemeToggle Component

**Location:** `src/components/common/ThemeToggle.js`

**Purpose:** Toggle between light and dark themes

**Props:** None (uses ThemeContext)

**Features:**
- Sun icon for light mode
- Moon icon for dark mode
- Smooth icon transition
- Accessible with aria-label
- Hover effects
- Persists preference to localStorage

**Usage:**
```javascript
<ThemeToggle />
```

---

## Routing Structure

### Route Hierarchy

```
/                              → Landing (public)
/login                         → Login (public)
/signup                        → Signup (public)

/student-dashboard/*           → Student Dashboard (protected, role: student)
  ├── /                        → Overview
  ├── /attendance              → Attendance Tracker
  ├── /timetable               → Weekly Timetable
  ├── /fees                    → Fees & Payments
  ├── /performance             → Academic Performance
  └── /documents               → Documents

/teacher-dashboard/*           → Teacher Dashboard (protected, role: teacher)
  ├── /                        → Overview
  ├── /attendance              → Mark Attendance
  ├── /students                → Student Management
  ├── /assessments             → Assessments
  └── /timetable               → Timetable

/hod-dashboard/*              → HOD Dashboard (protected, role: hod)
  └── /                        → Overview (expandable)

/admin-dashboard/*            → Admin Dashboard (protected, role: admin)
  └── /                        → Overview (expandable)

/*                            → Fallback redirect to /
```

### Protected Route Implementation

**Location:** `src/App.js`

```javascript
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  // Check authentication
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Check authorization
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'student') return <Navigate to="/student-dashboard" replace />;
    if (userRole === 'teacher') return <Navigate to="/teacher-dashboard" replace />;
    if (userRole === 'hod') return <Navigate to="/hod-dashboard" replace />;
    if (userRole === 'admin') return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

---

## State Management

### Global State (Context API)

#### AuthContext State Shape
```javascript
{
  currentUser: {
    id: string,
    name: string,
    email: string,
    role: 'student' | 'teacher' | 'hod' | 'admin'
  },
  login: (token, user) => void,
  logout: () => void,
  loading: boolean
}
```

**Usage:**
```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const { currentUser, login, logout } = useContext(AuthContext);
```

#### ThemeContext State Shape
```javascript
{
  darkMode: boolean,
  toggleTheme: () => void
}
```

**Usage:**
```javascript
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const { darkMode, toggleTheme } = useContext(ThemeContext);
```

### Local Storage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `token` | string | JWT authentication token |
| `userRole` | string | User's role (student/teacher/hod/admin) |
| `theme` | string | Theme preference ('dark' or 'light') |
| `dashboardColor` | string | Student dashboard color scheme |
| `widgetLayout` | JSON array | Student dashboard widget order |

### Component-Level State

**Common Patterns:**
```javascript
// Loading states
const [loading, setLoading] = useState(false);

// Form inputs
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// Error handling
const [error, setError] = useState('');

// Data fetching
const [data, setData] = useState([]);
useEffect(() => {
  fetchData().then(setData);
}, []);

// Modal/Dialog states
const [showModal, setShowModal] = useState(false);
```

---

## Current Implementation Status

### ✅ Fully Implemented
- Authentication flow with role-based routing
- Dark/light theme toggle with persistence
- Student dashboard with all sections:
  - Overview with customization
  - Attendance tracking
  - Timetable view
  - Fee management
  - Academic performance
  - Documents section
- Teacher dashboard structure:
  - Overview section
  - Attendance marking
  - Student management
  - Assessment creation
- Responsive sidebar navigation
- Protected route guards
- Landing page with feature highlights
- Login/signup pages with role selection
- Common components (Sidebar, DashboardCard, ThemeToggle)
- Context providers (Auth, Theme)

### 🚧 Mock Data (To Be Connected to Backend)
- Dashboard metrics and statistics
- Student/teacher/course data
- Attendance records
- Fee payment information
- Academic performance data
- Timetable information
- User profiles
- Announcements

### 📋 Future Enhancements Needed

**Priority 1 (Critical):**
- Backend API integration
- Real authentication endpoint
- Database connection for all entities
- Secure token storage (httpOnly cookies)
- API error handling

**Priority 2 (Important):**
- File upload functionality for documents
- Payment gateway integration for fees
- Email notification service
- Real-time notifications system
- Search and filtering capabilities across dashboards

**Priority 3 (Nice to Have):**
- Export to PDF functionality
- Mobile app version (React Native)
- Advanced analytics and reporting
- Bulk operations for admin
- Chat/messaging system between users
- Calendar integration
- Push notifications
- Offline mode support

---

## Dependencies & Libraries

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@heroicons/react` | 1.0.6 | SVG icon library for UI elements |
| `axios` | 1.3.4 | HTTP client for API calls (ready for backend) |
| `jwt-decode` | 3.1.2 | Decode and validate JWT tokens |
| `react` | 18.2.0 | Core React library |
| `react-dom` | 18.2.0 | React DOM rendering |
| `react-router-dom` | 6.8.2 | Client-side routing and navigation |
| `react-scripts` | 5.0.1 | Create React App build scripts |
| `recharts` | 2.15.4 | Charting library for data visualization |
| `web-vitals` | 5.1.0 | Performance metrics (CLS, FID, LCP) |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `autoprefixer` | 10.4.13 | PostCSS plugin for vendor prefixes |
| `postcss` | 8.4.21 | CSS transformation tool |
| `tailwindcss` | 3.2.7 | Utility-first CSS framework |

### Future Dependencies (Recommended)

```bash
# When adding backend integration:
npm install @tanstack/react-query      # Server state management
npm install zod                        # Schema validation

# When adding forms:
npm install react-hook-form            # Form management
npm install @hookform/resolvers        # Form validation

# When adding file uploads:
npm install react-dropzone             # Drag-and-drop file uploads

# When adding notifications:
npm install react-hot-toast            # Toast notifications

# When adding date pickers:
npm install react-datepicker           # Date selection component

# When adding tables:
npm install @tanstack/react-table      # Powerful table component
```

---

## Testing Strategy

### Test Framework
- **Unit Tests:** Jest (included with Create React App)
- **Component Tests:** React Testing Library
- **E2E Tests:** (Future) Cypress or Playwright

### Test Files Location
- Co-locate test files with components: `ComponentName.test.js`
- Integration tests in `src/__tests__/` directory
- E2E tests in `cypress/` or `e2e/` directory

### Running Tests
```bash
npm test                    # Interactive watch mode
npm test -- --coverage      # With coverage report
npm test -- --watchAll=false  # Run once (CI mode)
```

### Testing Patterns

**Component Tests:**
```javascript
// DashboardCard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardCard from './DashboardCard';

test('renders card with title and value', () => {
  render(<DashboardCard title="Test" value="100" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('100')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<DashboardCard title="Test" value="100" onClick={handleClick} />);
  fireEvent.click(screen.getByText('Test'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**Context Tests:**
```javascript
// AuthContext.test.js
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';

test('login sets currentUser and token', () => {
  const { result } = renderHook(() => useContext(AuthContext), {
    wrapper: AuthProvider
  });
  
  act(() => {
    result.current.login('token', { id: '1', name: 'Test', role: 'student' });
  });
  
  expect(result.current.currentUser.name).toBe('Test');
  expect(localStorage.getItem('token')).toBe('token');
});
```

---

## Building & Deployment

### Production Build

```bash
npm run build
```

**Build Output:**
- Directory: `build/`
- Optimized and minified code
- Source maps included
- Hashed filenames for cache busting
- Gzipped assets for faster loading

**Build Optimization:**
- Code splitting enabled
- Tree shaking for unused code removal
- CSS purging via Tailwind
- Image optimization
- Bundle size analysis available via `source-map-explorer`

### Deployment Platforms

**Recommended: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `build`

**GitHub Pages:**
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/dashboard"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

**Traditional Hosting (nginx/Apache):**
```nginx
# nginx configuration
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/dashboard/build;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
}
```

### Environment Variables

Create `.env` file in project root:
```bash
# API Configuration
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_API_VERSION=v1

# Authentication
REACT_APP_JWT_SECRET=your_jwt_secret_key

# Feature Flags
REACT_APP_ENABLE_PAYMENTS=true
REACT_APP_ENABLE_NOTIFICATIONS=false

# Third-party Services
REACT_APP_ANALYTICS_ID=UA-XXXXXXXXX-X
```

**Usage in Code:**
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

**Environment-Specific Files:**
- `.env` - Default environment
- `.env.local` - Local overrides (gitignored)
- `.env.development` - Development environment
- `.env.production` - Production environment

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Module Not Found Errors
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install

# Mac/Linux
rm -rf node_modules package-lock.json
npm install
```

#### 2. Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or specify different port
PORT=3001 npm start  # Mac/Linux
set PORT=3001 && npm start  # Windows CMD
$env:PORT=3001; npm start  # Windows PowerShell
```

#### 3. Dark Mode Not Persisting
- Check browser localStorage for `theme` key
- Verify Tailwind config has `darkMode: 'class'`
- Ensure ThemeContext is wrapping the app
- Check browser console for errors

#### 4. Build Fails
```bash
# Clear build cache
npm run build -- --clean

# Check for ESLint errors
npm run build 2>&1 | grep -i "error"

# Verbose build output
npm run build -- --verbose
```

#### 5. React Router 404 on Refresh (Production)
- Configure server to serve `index.html` for all routes
- See deployment platform documentation for rewrites
- For nginx, add `try_files $uri /index.html`

#### 6. Tailwind Classes Not Working
- Ensure `content` paths in `tailwind.config.js` include all component files
- Avoid dynamic class names: ❌ `bg-${color}-500` ✅ `bg-blue-500`
- Restart dev server after Tailwind config changes

#### 7. Context Not Available
```javascript
// ❌ Wrong - Context used outside Provider
const { currentUser } = useContext(AuthContext);

// ✅ Correct - Ensure component is wrapped in Provider
<AuthProvider>
  <YourComponent />
</AuthProvider>
```

---

## Best Practices for AI Agents

### When Adding New Features

1. **Follow Existing Structure**
   - Place components in appropriate directories
   - Use PascalCase for component files
   - Follow established naming conventions

2. **Maintain Consistency**
   - Use functional components with hooks
   - Follow existing state management patterns
   - Match code style (2 spaces, Prettier formatting)

3. **Implement Dark Mode Support**
   - Always add `dark:` variants for backgrounds, text, borders
   - Test both themes before finalizing
   - Use semantic color classes from Tailwind config

4. **Add Proper Routing**
   - Define routes in `App.js`
   - Add protection if needed via `ProtectedRoute`
   - Update navigation in appropriate Sidebar menu items

5. **Update Documentation**
   - Add new features to this AGENTS.md file
   - Document new components and their props
   - Update routing structure if changed

### When Modifying Components

1. **Check for Similar Patterns**
   - Review existing components for similar functionality
   - Reuse common components (DashboardCard, Sidebar, etc.)
   - Maintain consistent prop interfaces

2. **Preserve Responsive Design**
   - Test on mobile, tablet, and desktop viewports
   - Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
   - Ensure touch-friendly on mobile

3. **Test Both Themes**
   - Verify light mode appearance
   - Verify dark mode appearance
   - Check contrast ratios for accessibility

4. **Handle Edge Cases**
   - Empty states (no data)
   - Loading states
   - Error states
   - Long text/overflow scenarios

### When Working with State

1. **Choose Appropriate State Location**
   - **Local state (useState):** Component-specific data
   - **Context:** Cross-component shared state (auth, theme)
   - **localStorage:** Persistent user preferences
   - **Future (API):** Server state with React Query

2. **Optimize Performance**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for functions passed as props
   - Avoid unnecessary re-renders
   - Consider state colocation (keep state close to usage)

3. **Handle Side Effects**
   - Use `useEffect` for subscriptions, data fetching
   - Clean up effects (return cleanup function)
   - Specify correct dependencies array
   - Avoid infinite loops

### When Styling Components

1. **Use Tailwind Utilities First**
   - Prefer utility classes over custom CSS
   - Combine utilities for complex styles
   - Use `@apply` in CSS only for truly reusable patterns

2. **Follow Color Scheme**
   - Primary colors: Blue shades (primary-500, primary-600)
   - Gray scale: For backgrounds, borders, text
   - Semantic colors: green (success), red (error), yellow (warning)
   - Consistent color usage across similar elements

3. **Maintain Accessibility**
   - Add `aria-label` to icon-only buttons
   - Use semantic HTML (`<nav>`, `<main>`, `<aside>`)
   - Ensure keyboard navigation works
   - Maintain color contrast (WCAG AA minimum)
   - Test with screen readers if possible

4. **Responsive Patterns**
   ```javascript
   // Mobile-first approach
   <div className="
     p-4           // mobile: padding 1rem
     md:p-6        // tablet: padding 1.5rem
     lg:p-8        // desktop: padding 2rem
   ">
   ```

### When Handling Forms

1. **Form Validation**
   - Validate on submit, not on every keystroke
   - Show clear error messages
   - Use controlled components
   - Consider react-hook-form for complex forms

2. **User Feedback**
   - Disable submit button during submission
   - Show loading indicators
   - Display success/error messages
   - Clear forms after successful submission

### When Integrating APIs (Future)

1. **Error Handling**
   ```javascript
   try {
     const response = await axios.get('/api/data');
     setData(response.data);
   } catch (error) {
     if (error.response?.status === 401) {
       logout(); // Token expired
     } else {
       setError('Failed to fetch data');
     }
   }
   ```

2. **Loading States**
   ```javascript
   const [loading, setLoading] = useState(false);
   
   const fetchData = async () => {
     setLoading(true);
     try {
       const data = await api.get('/endpoint');
       setData(data);
     } finally {
       setLoading(false);
     }
   };
   ```

3. **Request Patterns**
   - Use axios interceptors for auth headers
   - Implement request/response logging
   - Handle network errors gracefully
   - Consider request cancellation for navigation

---

## API Integration Notes (For Future Development)

### Expected Backend Endpoints

#### Authentication
```javascript
POST   /api/auth/login          // User login
POST   /api/auth/signup         // User registration
POST   /api/auth/logout         // User logout
GET    /api/auth/verify         // Token verification
POST   /api/auth/refresh        // Refresh access token
POST   /api/auth/forgot-password // Password reset request
POST   /api/auth/reset-password  // Password reset
```

**Request/Response Examples:**
```javascript
// Login Request
{
  email: "student@college.edu",
  password: "password123"
}

// Login Response
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "123",
    name: "John Doe",
    email: "student@college.edu",
    role: "student"
  }
}
```

#### Student Endpoints
```javascript
GET    /api/student/profile          // Get student profile
PUT    /api/student/profile          // Update student profile
GET    /api/student/attendance       // Get attendance records
GET    /api/student/attendance/:id   // Get specific attendance
GET    /api/student/grades           // Get academic performance
GET    /api/student/fees             // Get fee details
POST   /api/student/fees/pay         // Process fee payment
GET    /api/student/timetable        // Get class schedule
GET    /api/student/documents        // List documents
GET    /api/student/documents/:id    // Download document
POST   /api/student/documents        // Upload document
GET    /api/student/announcements    // Get announcements
```

#### Teacher Endpoints
```javascript
GET    /api/teacher/classes          // Get assigned classes
GET    /api/teacher/classes/:id      // Get class details
POST   /api/teacher/attendance       // Mark attendance
GET    /api/teacher/attendance       // Get attendance records
GET    /api/teacher/students         // Get student list
GET    /api/teacher/students/:id     // Get student details
POST   /api/teacher/assessments      // Create assessment
PUT    /api/teacher/assessments/:id  // Update assessment
GET    /api/teacher/assessments      // List assessments
POST   /api/teacher/grades           // Submit grades
GET    /api/teacher/timetable        // Get teaching schedule
POST   /api/teacher/announcements    // Post announcement
```

#### Admin/HOD Endpoints
```javascript
GET    /api/admin/analytics          // Dashboard statistics
GET    /api/admin/users              // List all users
POST   /api/admin/users              // Create user
PUT    /api/admin/users/:id          // Update user
DELETE /api/admin/users/:id          // Delete user
GET    /api/admin/reports            // Generate reports
GET    /api/admin/courses            // List courses
POST   /api/admin/courses            // Create course
PUT    /api/admin/courses/:id        // Update course
DELETE /api/admin/courses/:id        // Delete course
GET    /api/admin/settings           // Get system settings
PUT    /api/admin/settings           // Update settings
```

### API Client Setup (Recommended)

**Create `src/services/api.js`:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - logout user
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Usage in Components:**
```javascript
import api from '../services/api';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/student/profile');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchData();
  }, []);
};
```

---

## Accessibility Considerations

### Implementation Checklist

- ✅ Semantic HTML elements used throughout
- ✅ ARIA labels on interactive elements (buttons, icons)
- ✅ Keyboard navigation support (Tab, Enter, Escape)
- ✅ Sufficient color contrast (WCAG AA compliant)
- ✅ Responsive design for all screen sizes
- ⏳ Screen reader testing (recommended)
- ⏳ Focus indicators on all interactive elements
- ⏳ Skip navigation links for main content

### Accessibility Patterns

**Icon Buttons:**
```javascript
<button aria-label="Toggle dark mode" onClick={toggleTheme}>
  <MoonIcon />
</button>
```

**Form Labels:**
```javascript
<label htmlFor="email">Email Address</label>
<input 
  id="email" 
  type="email" 
  aria-required="true"
  aria-invalid={error ? 'true' : 'false'}
/>
{error && <span role="alert">{error}</span>}
```

**Loading States:**
```javascript
{loading && <div role="status" aria-live="polite">Loading...</div>}
```

**Navigation:**
```javascript
<nav aria-label="Main navigation">
  <ul>
    <li><Link to="/">Home</Link></li>
  </ul>
</nav>
```

---

## Security Notes

### Current Implementation

- ✅ JWT tokens stored in localStorage
- ✅ Token expiry validation on app load
- ✅ Protected routes prevent unauthorized access
- ✅ Mock authentication (development only)
- ⚠️ No HTTPS enforcement (add in production)
- ⚠️ No CSRF protection (add with backend)
- ⚠️ No rate limiting (backend responsibility)

### Production Security Checklist

**Authentication:**
- [ ] Use httpOnly cookies instead of localStorage for tokens
- [ ] Implement refresh token rotation
- [ ] Add rate limiting on login attempts
- [ ] Enable HTTPS only
- [ ] Implement CSRF protection
- [ ] Add two-factor authentication (optional)

**Data Protection:**
- [ ] Sanitize all user inputs before API calls
- [ ] Validate all data on backend
- [ ] Implement Content Security Policy (CSP)
- [ ] Use parameterized queries (backend)
- [ ] Encrypt sensitive data at rest

**Headers & CORS:**
```javascript
// Backend should set these headers
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'"
}
```

**Environment Variables:**
- [ ] Never commit `.env` files to version control
- [ ] Use different secrets for dev/staging/production
- [ ] Rotate secrets regularly
- [ ] Use secret management service (AWS Secrets Manager, etc.)

---

## Performance Optimizations

### Current Optimizations

- ✅ Code splitting with React Router
- ✅ Production builds with minification
- ✅ Tailwind CSS purging for minimal CSS bundle
- ✅ Web Vitals monitoring enabled
- ⏳ Lazy loading for route components
- ⏳ Image optimization
- ⏳ Memoization of expensive calculations

### Recommended Optimizations

**Code Splitting:**
```javascript
import { lazy, Suspense } from 'react';

const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <StudentDashboard />
</Suspense>
```

**Memoization:**
```javascript
import { useMemo, useCallback } from 'react';

const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => /* expensive calculation */);
  }, [data]);
  
  const handleClick = useCallback(() => {
    // handle click
  }, [/* dependencies */]);
};
```

**Image Optimization:**
```javascript
// Use WebP format with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

**Bundle Analysis:**
```bash
npm install --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

---

## Component API Reference

### DashboardCard

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | Card title text |
| value | string\|number | Yes | - | Metric value to display |
| icon | ReactNode | No | - | Icon component |
| color | string | No | 'blue' | Tailwind color name |
| onClick | function | No | - | Click handler |

### Sidebar

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| menuItems | Array<MenuItem> | Yes | Navigation menu items |

**MenuItem Type:**
```typescript
{
  name: string;     // Display name
  path: string;     // Route path
  icon: ReactNode;  // Icon component
}
```

### ThemeToggle

**Props:** None (uses ThemeContext)

### ProtectedRoute

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | Component to protect |
| allowedRoles | string[] | No | Allowed user roles |

---

## File Organization Guidelines

### Component Files
```
ComponentName.js          // Component implementation
ComponentName.test.js     // Component tests
ComponentName.module.css  // CSS modules (if needed)
```

### Page Structure
```javascript
// PageName.js structure
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Sub-components (if page-specific)
const SubComponent = () => { /* ... */ };

// 2. Main component
const PageName = () => {
  // 2a. Hooks
  const navigate = useNavigate();
  const [state, setState] = useState();
  
  // 2b. Effects
  useEffect(() => { /* ... */ }, []);
  
  // 2c. Handlers
  const handleClick = () => { /* ... */ };
  
  // 2d. Render
  return (/* JSX */);
};

// 3. Export
export default PageName;
```

---

## Git Workflow (Recommended)

### Branch Naming
```
main                    // Production-ready code
develop                 // Integration branch
feature/feature-name    // New features
bugfix/bug-name        // Bug fixes
hotfix/critical-fix    // Production hotfixes
```

### Commit Messages
```
feat: Add student attendance tracking
fix: Resolve dark mode persistence issue
docs: Update AGENTS.md with API endpoints
style: Format code with Prettier
refactor: Simplify authentication logic
test: Add tests for DashboardCard component
chore: Update dependencies
```

---

## Contact & Support

### For Development Questions
1. Check this AGENTS.md documentation first
2. Review existing code patterns and implementations
3. Consult official documentation:
   - [React Docs](https://react.dev)
   - [Tailwind CSS](https://tailwindcss.com/docs)
   - [React Router](https://reactrouter.com)
   - [Create React App](https://create-react-app.dev)

### For Bug Reports
Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Console errors (if any)
- Screenshots (if applicable)

---

## Quick Reference

### Common Tasks

**Add a new page:**
1. Create component in `src/pages/PageName.js`
2. Add route in `src/App.js`
3. Add to sidebar menu if needed
4. Update this documentation

**Add a new component:**
1. Create in `src/components/category/ComponentName.js`
2. Follow existing patterns
3. Add props documentation
4. Write tests

**Add API integration:**
1. Create service in `src/services/api.js`
2. Create endpoint functions
3. Use in components with try/catch
4. Handle loading and error states

**Style a component:**
1. Use Tailwind utilities first
2. Add dark mode variants
3. Test responsiveness
4. Ensure accessibility

---

**Last Updated:** October 2025  
**Version:** 1.0.0  
**Maintained By:** Development Team  
**License:** MIT (or as specified)
