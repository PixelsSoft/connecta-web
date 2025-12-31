# Test Credentials for Local Development

This document contains test user credentials that can be used to login to the application during local development.

## Test Users

### 1. User (Service Booker)
**Email:** `user@connecta24.com`  
**Password:** `user123`  
**Role:** `user`  
**Dashboard:** User Dashboard (`/user/saved-leads`)

**User Details:**
- Name: John User
- Full Name: John User
- Email: user@connecta24.com

**Access:**
- Saved Leads
- Chat
- Account Settings (User)
- Contact Center (User)

---

### 2. Professional (Service Provider)
**Email:** `professional@connecta24.com`  
**Password:** `pro123`  
**Role:** `professional`  
**Dashboard:** Professional Dashboard (`/recruiter/posted-jobs`)

**User Details:**
- Name: Jane Professional
- Full Name: Jane Professional
- Email: professional@connecta24.com

**Access:**
- Posted Jobs
- Chat
- Account Settings (Professional)
- Contact Center (Professional)

---

## How to Login

1. Navigate to `/login` in your browser
2. Enter one of the test credentials above
3. Click "Sign In"
4. You will be redirected to the appropriate dashboard based on the user role

## Quick Login Links

### Login as User
- Email: `user@connecta24.com`
- Password: `user123`
- Redirects to: `/user/saved-leads`

### Login as Professional
- Email: `professional@connecta24.com`
- Password: `pro123`
- Redirects to: `/recruiter/posted-jobs`

## LocalStorage Data

After successful login, the following data is stored in localStorage:

### For User Account:
```javascript
localStorage.getItem('auth_token') // Mock token
localStorage.getItem('user_data') // {"email":"user@connecta24.com","name":"John User","fullName":"John User"}
localStorage.getItem('user_role') // "user"
```

### For Professional Account:
```javascript
localStorage.getItem('auth_token') // Mock token
localStorage.getItem('user_data') // {"email":"professional@connecta24.com","name":"Jane Professional","fullName":"Jane Professional"}
localStorage.getItem('user_role') // "professional"
```

## Manual Login via Browser Console

You can also manually set the authentication state in the browser console:

### Login as User:
```javascript
localStorage.setItem('auth_token', 'mock_token_user');
localStorage.setItem('user_data', JSON.stringify({
  email: 'user@connecta24.com',
  name: 'John User',
  fullName: 'John User'
}));
localStorage.setItem('user_role', 'user');
window.location.reload();
```

### Login as Professional:
```javascript
localStorage.setItem('auth_token', 'mock_token_professional');
localStorage.setItem('user_data', JSON.stringify({
  email: 'professional@connecta24.com',
  name: 'Jane Professional',
  fullName: 'Jane Professional'
}));
localStorage.setItem('user_role', 'professional');
window.location.reload();
```

## Logout

To logout, either:
1. Click the logout button in the header dropdown menu
2. Or run in browser console:
```javascript
localStorage.removeItem('auth_token');
localStorage.removeItem('user_data');
localStorage.removeItem('user_role');
window.location.reload();
```

## Notes

- These are **test credentials only** for local development
- In production, these credentials will be replaced with actual API authentication
- The current implementation uses mock authentication
- Passwords are not validated against a database - they are hardcoded in the Login component
- All test users are automatically logged in when credentials match

## Testing Different Roles

### Test User Role:
1. Login with: `user@connecta24.com` / `user123`
2. Verify you see:
   - User Dashboard header
   - Saved Leads tab
   - User Account Settings link
   - No Login/Sign Up buttons in main header

### Test Professional Role:
1. Login with: `professional@connecta24.com` / `pro123`
2. Verify you see:
   - Professional Dashboard header
   - Posted Jobs tab
   - Professional Account Settings link
   - No Login/Sign Up buttons in main header

## Sign Up Alternative

You can also create new test accounts by:
1. Going to `/sign-up`
2. Filling in the form
3. Selecting either "User (Book Services)" or "Professional (Offer Services)"
4. The account will be created and you'll be automatically logged in

---

**Important:** These credentials are for development purposes only. Do not use these in production environments.

