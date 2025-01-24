# E-Commerce Web Application

[Visit the Live Project](https://el-shop.netlify.app/)

This is a modern e-commerce web application built using Angular 19. The platform provides users with the ability to browse products, manage their shopping cart, view product details, and access admin features. The app includes authentication, cart management, and a theme-switching option.

---

## Features

### User Features

- **Product Listing**: Browse all products with details such as name, price, and description.
- **Product Details**: View detailed information about a specific product.
- **Shopping Cart**: Add, update, or remove products from the cart.
- **Authentication**:
  - Login/Logout functionality for users.
  - Access control for admin-specific features.
- **Theme Switching**: Toggle between light and dark themes for better user accessibility.

### Admin Features

- **Admin Dashboard**: Manage the product catalog (add, edit, or delete products).
- **Secure Access**: Admin functionalities are restricted to authorized users only.

### Technologies Used

- **Frontend**: Angular 19, TypeScript
- **Styling**: SCSS (SASS)
- **Routing**: Angular Router
- **State Management**: Angular Services
- **API Calls**: Angular HTTPClient
- **Storage**: LocalStorage / SessionStorage
- **Notifications**: Ngx-Toastr
- **Icons**: Custom SVG assets

## Project Structure

src/

- ├── app/
- │ ├── components/
- │ │ ├── nav-bar/ # Navbar component
- │ │ ├── product-list/ # Product listing component
- │ │ ├── product-detail/ # Product detail component
- │ │ ├── cart/ # Cart component
- │ │ └── admin/ # Admin dashboard component
- │ ├── models/ # Interfaces for data (Product, CartItem, etc.)
- │ ├── services/ # Services for handling API, cart, auth, etc.
- │ ├── shared/ # Shared modules, directives, pipes
- │ └── app-routing.module.ts # Application routes
- ├── assets/ # Static assets (icons, images, etc.)
- ├── environments/ # Environment configuration files
- └── styles/ # Global SCSS styles

## Core Functionalities

### Product Listing

- Displays a list of products fetched from a mock API [https://fakestoreapi.com/products].
- Each product includes its name, image, price, and a button to view more details.

### Product Details

- Displays detailed information about the selected product.
- Includes an option to add the product to the shopping cart.

### Shopping Cart

- Tracks items added by the user.
- Allows updating the quantity or removing items.
- Displays a total price calculation.

### Authentication

- Users can log in to access protected routes like the admin dashboard [https://fakestoreapi.com/users].
- Admin users can perform CRUD operations on products.

### Responsive Navbar

- Provides easy navigation between home, cart, and admin.
- Collapses links into a burger menu on smaller screens.

### Theme Switching

- Allows toggling between light and dark modes for improved accessibility.

### API Integration

- The project integrates with a mock API [https://fakestoreapi.com] for product and user data.
