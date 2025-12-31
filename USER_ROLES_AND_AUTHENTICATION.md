# User Roles and Authentication System

## Overview

This document describes the user role system and authentication flow implemented in the Connecta24 application. The system supports two distinct user types with different access levels and dashboard panels.

## User Roles

### 1. User (Service Bookers)
- **Role Identifier**: `user`
- **Description**: Users who book and request services from professionals
- **Default Navigation**: `/user/saved-leads`
- **Dashboard Access**: User Dashboard

### 2. Professional (Service Providers)
- **Role Identifier**: `professional`
- **Description**: Professionals who offer services to users
- **Default Navigation**: `/recruiter/posted-jobs`
- **Dashboard Access**: Recruiter/Professional Dashboard

## Authentication Flow

### Login Process

1. User navigates to `/login`
2. User enters email and password
3. System authenticates user (API call)
4. System retrieves user role from API response
5. User is redirected based on role:
   - **User**: `/user/saved-leads`
   - **Professional**: `/recruiter/posted-jobs`

### Sign Up Process

1. User navigates to `/sign-up`
2. User fills in registration form:
   - Full Name
   - Email
   - Password
   - Confirm Password
   - **Role Selection**: User or Professional
3. System creates account with selected role
4. User is redirected based on selected role:
   - **User**: `/user/saved-leads`
   - **Professional**: `/recruiter/posted-jobs`

### Logout Process

1. User clicks logout from header dropdown
2. System clears:
   - `auth_token` from localStorage
   - `user_data` from localStorage
   - `user_role` from localStorage
3. User is redirected to home page (`/`)

## Header Behavior

### When User is NOT Logged In

The header displays:
- **Post Job** button (links to `/find-professionals`)
- **Login** button (links to `/login`)
- **Sign Up** button (links to `/sign-up`)

### When User IS Logged In

The header displays:
- **Post Job** button (links to `/find-professionals`)
- **User Dropdown Menu** with:
  - User greeting: "Hi [User Name]"
  - **Chat** link (links to `/chat`)
  - **Profile Settings** link (role-based):
    - Users: `/user/account-setting/profile-details`
    - Professionals: `/recruiter/account-setting/contact-info`
  - **Logout** option

**Note**: Login and Sign Up buttons are hidden when user is authenticated.

## Dashboard Panels

### User Dashboard (Role: `user`)

Accessible via UserLayout component with UserHeader.

**Navigation Tabs:**
- **Saved Leads** (`/user/saved-leads`)
- **Chat** (`/chat`)
- **Account Settings** (`/user/account-setting/profile-details`)
- **Contact Center** (`/user/contact-center`)

**Account Settings Pages:**
- Profile Details
- Company Details
- Manage Account
- Notifications
- Applied Jobs
- Payment Method

### Professional Dashboard (Role: `professional`)

Accessible via RecruiterLayout component with RecruiterHeader.

**Navigation Tabs:**
- **Posted Jobs** (`/recruiter/posted-jobs`)
- **Chat** (`/chat`)
- **Account Settings** (`/recruiter/account-setting/contact-info`)
- **Contact Center** (`/recruiter/contact-center`)

**Account Settings Pages:**
- Contact Information
- Manage Account
- Notifications
- Previous Jobs
- Change Password

## Implementation Details

### Authentication Context

Location: `src/context/AuthContext.jsx`

**Features:**
- Manages user authentication state
- Stores user data and role in localStorage
- Provides `login()`, `logout()`, and `useAuth()` hook
- Automatically checks for existing session on app load

**Usage:**
```javascript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { isAuthenticated, user, userRole, login, logout } = useAuth();
  // Use authentication state and methods
};
```

### LocalStorage Keys

- `auth_token`: JWT or session token
- `user_data`: JSON stringified user object
- `user_role`: User role string (`'user'` or `'professional'`)

### Header Component

Location: `src/components/Layouts/Header/index.jsx`

**Key Features:**
- Conditionally renders login/signup buttons based on `isAuthenticated`
- Shows user dropdown when logged in
- Displays user name from user data
- Role-based profile settings link
- Logout functionality

## API Integration Notes

### Current Implementation

The current implementation uses mock authentication for development. In production, you should:

1. **Login API Call:**
   ```javascript
   // Replace mock login in Login.jsx
   const response = await apiClient.post('/auth/login', { email, password });
   login(response.token, response.user, response.user.role);
   ```

2. **Sign Up API Call:**
   ```javascript
   // Replace mock signup in SignUP.jsx
   const response = await apiClient.post('/auth/signup', {
     fullName,
     email,
     password,
     role: userRole
   });
   login(response.token, response.user, response.user.role);
   ```

3. **Token Refresh:**
   - Implement token refresh mechanism
   - Handle token expiration
   - Redirect to login on invalid token

## Security Considerations

1. **Token Storage**: Currently using localStorage. Consider httpOnly cookies for production.
2. **Password Handling**: Never store passwords in localStorage or state.
3. **Role Validation**: Always validate user role on protected routes.
4. **API Authorization**: Include auth token in all API requests via `apiClient`.

## Testing User Roles

### Test as User (Service Booker)

1. Sign up with role "User (Book Services)"
2. Should see User Dashboard with Saved Leads tab
3. Header should show user dropdown (no login/signup buttons)
4. Profile Settings should link to `/user/account-setting/profile-details`

### Test as Professional (Service Provider)

1. Sign up with role "Professional (Offer Services)"
2. Should see Professional Dashboard with Posted Jobs tab
3. Header should show user dropdown (no login/signup buttons)
4. Profile Settings should link to `/recruiter/account-setting/contact-info`

## File Structure

```
src/
├── context/
│   └── AuthContext.jsx          # Authentication context provider
├── components/
│   └── Layouts/
│       ├── Header/
│       │   └── index.jsx         # Main header with auth logic
│       ├── UserLayout/
│       │   └── UserHeader/      # User dashboard header
│       └── RecruiterLayout/
│           └── RecruiterHeader/ # Professional dashboard header
├── screens/
│   └── AuthPages/
│       ├── Login.jsx            # Login page with auth integration
│       └── SignUP.jsx           # Sign up page with role selection
└── App.jsx                      # Wrapped with AuthProvider
```

## Future Enhancements

1. **Role Switching**: Allow users to have multiple roles
2. **Role Permissions**: Implement granular permission system
3. **Session Management**: Add session timeout and refresh
4. **Two-Factor Authentication**: Add 2FA support
5. **Social Login**: Integrate Google, Facebook login
6. **Email Verification**: Add email verification flow

## Support

For questions or issues related to authentication and user roles, please refer to:
- Authentication Context: `src/context/AuthContext.jsx`
- Header Component: `src/components/Layouts/Header/index.jsx`
- Login Page: `src/screens/AuthPages/Login.jsx`
- Sign Up Page: `src/screens/AuthPages/SignUP.jsx`

