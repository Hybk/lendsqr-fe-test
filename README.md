# User Management Dashboard

A modern React-based dashboard for managing users, built with TypeScript and featuring comprehensive user management capabilities including filtering, pagination, and detailed user views.

## 🚀 Features

- **Authentication**

  - Secure login system
  - Protected dashboard routes

- **User Management**

  - Comprehensive user listing with pagination
  - Advanced filtering capabilities
  - User status tracking (Active, Inactive, Pending, Blacklisted)
  - Detailed user profiles
  - User statistics and metrics

- **Dashboard Interface**
  - Responsive design
  - Interactive data tables
  - Statistical cards
  - Action dropdowns for user management
  - Filter popups for data refinement

## 🛠️ Technologies Used

- **Core**

  - React
  - TypeScript
  - React Router DOM (for navigation)

- **Styling**

  - SCSS/Sass
  - Responsive design principles

- **UI Components**

  - Lucide React (for icons)

- **State Management**
  - React Hooks (useState, useEffect, useCallback, useMemo)
  - Local Storage for persistence

## 📦 Project Structure

```
src/
├── components/
│   |
│   └── Users.tsx/
│   └── filterPopup.tsx/
|    └── header.tsx/
|    └── navBar.tsx/
|
├── pages/
│   ├── login/
│   ├── dashboard/
│   └── userDetails/
├── styles/
│   ├── Base.scss
│   └── user.scss
└── App.tsx
└── MockAPI.ts
└── Storage.ts

```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hybk/lendsqr-fe-test.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication

The application includes a login system with protected routes. Users must authenticate before accessing the dashboard.

## 📊 Dashboard Features

### User Management

- View all users in a paginated table
- Filter users by multiple criteria:
  - Organization
  - Username
  - Email
  - Date joined
  - Phone number
  - Status

### User Actions

- View detailed user information
- Blacklist users
- Activate users
- Update user status

### Statistics

- Total users count
- Active users
- Users with loans
- Users with savings

## 🔄 State Management

- Uses React's built-in state management with hooks
- Implements local storage for persistent filters and pagination state
- Efficient rendering with useMemo and useCallback hooks

## 🎨 Styling

- SCSS modules for component-specific styling
- Responsive design for various screen sizes
- Consistent color scheme and typography
- Icon integration with Lucide React

## 🧪 Mock API

Includes a mock API service that provides:

- Paginated user data
- User filtering
- Detailed user information
- Random data generation for testing

## 📱 Responsive Design

- Desktop-first approach
- Mobile-responsive tables
- Adaptive layout for different screen sizes
- Conditional rendering for optimal mobile experience

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🙏 Acknowledgments

- Lucide React for the icon set
- React Router team for the routing solution
- SCSS/Sass community for the styling framework
