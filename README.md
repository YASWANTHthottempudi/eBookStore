# CodeBook - Modern E-Book Store

A modern, responsive e-commerce platform for computer science e-books built with React, featuring advanced functionality and a beautiful user interface.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **Wishlist System**: Add and manage favorite books with a dedicated wishlist page
- **Advanced Search**: Real-time search with multiple filters (price, rating, category, sorting)
- **Shopping Cart**: Full cart functionality with item management
- **User Authentication**: Secure login/register system with session management
- **Product Management**: Detailed product pages with ratings and reviews
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Toast Notifications**: User-friendly feedback for all actions

## Technology Stack

- **Frontend**: React 18, React Router, React Toastify
- **Styling**: Tailwind CSS with custom animations
- **Backend**: JSON Server with authentication middleware
- **State Management**: React Context API
- **Icons**: Bootstrap Icons
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Elements/       # Product cards, ratings, dropdowns
│   ├── Layouts/        # Header, footer components
│   └── Sections/       # Search, hero sections
├── context/            # React context providers
├── pages/              # Main application pages
│   ├── Home/          # Landing page components
│   ├── Products/      # Product listing and details
│   ├── Cart/          # Shopping cart functionality
│   ├── Wishlist/      # Wishlist management
│   └── Dashboard/     # User dashboard
├── services/           # API service functions
├── routes/             # Application routing
└── hooks/              # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YASWANTHthottempudi/eBookStore.git
cd eBookStore
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npx json-server data/db.json -r data/routes.json -m ./node_modules/json-server-auth --port 8000
```

4. Start the React development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- **Products**: `GET /444/products`
- **Featured Products**: `GET /444/featured_products`
- **User Registration**: `POST /register`
- **User Login**: `POST /login`
- **Orders**: `GET /600/orders`
- **Users**: `GET /600/users`

## Key Features Explained

### Wishlist System
- Add/remove books to wishlist
- Wishlist counter in header
- Dedicated wishlist page with management options
- Persistent wishlist state

### Advanced Search
- Real-time search with debouncing
- Multiple filter options:
  - Price range filtering
  - Rating-based filtering
  - Category-based filtering
  - Sorting options (name, price, rating)
- Modal search interface with results preview




