# Adriane's Frontend - Event Management Platform

![Event Management Platform](./banner.png)

A sophisticated and modern React-based frontend application designed for comprehensive event management. This platform empowers users to create and manage events, handle payments, and provides administrators with powerful tools to oversee operations. Guests can seamlessly view event photos through dedicated access features.

Built with cutting-edge technologies, Adriane's Frontend offers a responsive, accessible, and feature-rich experience for event organizers, administrators, and attendees alike.

## 🌟 Features

### 👤 User Dashboard
- **Event Creation**: Intuitive interface for creating and customizing events
- **Event Management**: View, edit, and track personal events
- **Payment Integration**: Secure payment processing for event services
- **Profile Management**: Comprehensive user profile settings
- **Wedding Mode**: Specialized features for wedding event planning

### 🛠️ Admin Dashboard
- **Event Oversight**: Complete management of all platform events
- **User Management**: Administer user accounts and permissions
- **Payment Monitoring**: Track and manage all payment transactions
- **Photo Management**: Curate and organize event photo galleries
- **Custom Plans**: Create tailored service packages

### 🎉 Guest Experience
- **Photo Viewing**: Secure access to event photo galleries
- **Tutorial Guidance**: Step-by-step assistance for first-time users
- **Responsive Design**: Optimized viewing across all devices

### 🌐 Internationalization
- **Multi-language Support**: English, Dutch (Belgium, Curaçao, Netherlands, Suriname), Polish
- **Dynamic Language Switching**: Seamless language transitions

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Accessibility**: WCAG-compliant components and navigation

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router v7
- **Internationalization**: i18next with browser language detection
- **Charts & Visualization**: ApexCharts, FullCalendar
- **UI Components**: Custom component library with Lucide icons
- **Forms & Interactions**: React Dropzone, Flatpickr, GSAP animations
- **Notifications**: Sonner for toast notifications
- **Alerts**: SweetAlert2 for modal dialogs

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.x or later (recommended: 20.x or later)
- **npm** or **yarn**: Package manager
- **Git**: For cloning the repository

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone 
cd adrianes-frontend
```

> **Note for Windows Users**: If you encounter issues during cloning, try placing the repository near the root of your drive.

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## 📖 Usage

### For Users
1. **Register/Login**: Create an account or sign in to access your dashboard
2. **Create Events**: Use the event creation wizard to set up new events
3. **Manage Events**: View and edit your events from the dashboard
4. **Handle Payments**: Process payments for event services
5. **Customize Profile**: Update your personal information and preferences

### For Administrators
1. **Access Admin Panel**: Navigate to the admin dashboard
2. **Manage Events**: Oversee all platform events and their details
3. **User Administration**: Manage user accounts and permissions
4. **Payment Oversight**: Monitor and manage payment transactions
5. **Photo Galleries**: Organize and moderate event photo collections

### For Guests
1. **Access Event**: Use provided credentials to view event photos
2. **Browse Gallery**: Navigate through photo collections
3. **Download/Share**: Save or share memorable moments

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AdminDashComponent/    # Admin dashboard components
│   ├── auth/                  # Authentication forms
│   ├── common/                # Shared components (pagination, modals, etc.)
│   ├── header/                # Header components and dropdowns
│   ├── HomePageComponent/     # Landing page sections
│   ├── ShearComponent/        # Shared layout components
│   ├── tables/                # Table components
│   ├── ui/                    # Base UI elements (buttons, modals, etc.)
│   └── UserDashboard/         # User dashboard components
├── context/               # React contexts (Theme, Sidebar)
├── hooks/                 # Custom React hooks
├── layout/                # Layout components (Dashboard, Main, Sidebar)
├── locales/               # Internationalization files
├── pages/                 # Page components
│   ├── AdminDashboard/        # Admin pages
│   ├── AuthPages/             # Authentication pages
│   ├── Dashboard/             # User dashboard pages
│   ├── GustPages/             # Guest access pages
│   ├── Home/                  # Landing page
│   ├── routes/                # Routing configuration
│   └── Tables/                # Table-related pages
├── Redux/                 # State management
│   ├── api/                   # API integration
│   └── features/              # Redux slices
└── assets/                # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌍 Internationalization

The application supports multiple languages:
- English (en)
- Dutch - Belgium (nl-BE)
- Dutch - Curaçao (nl-CW)
- Dutch - Netherlands (nl-NL)
- Dutch - Suriname (nl-SR)
- Polish (pl)

Language files are located in `src/locales/` and can be extended as needed.

## 🎨 Theming

The application features a comprehensive theming system:
- **Dark Mode**: Automatic system preference detection
- **Light Mode**: Clean, bright interface
- **Theme Persistence**: User preferences saved across sessions

## 📱 Responsive Design

Fully responsive across all device sizes:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adapted layouts with collapsible menus
- **Mobile**: Optimized touch interfaces and navigation




**Adriane's Frontend** - Transforming event management with modern web technologies.
