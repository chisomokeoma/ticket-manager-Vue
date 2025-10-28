# Xomie's Ticket Manager - Vue.js Version

This is a complete Vue.js/Nuxt.js conversion of the original React ticket management system. The application provides identical functionality and styling to the React version.

## Features

- **Landing Page**: Beautiful animated landing page with feature highlights
- **Authentication**: Sign-in and sign-up pages with form validation
- **Dashboard**: Comprehensive dashboard with ticket statistics and analytics
- **Ticket Management**: Full CRUD operations for tickets with modal forms
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Pinia stores for authentication and ticket management
- **Toast Notifications**: User-friendly notifications for all actions
- **Icons**: Lucide Vue icons for consistent UI elements

## Tech Stack

- **Framework**: Nuxt.js 4.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Icons**: Lucide Vue Next
- **Notifications**: Vue Toastification
- **Routing**: Vue Router (built into Nuxt)

## Project Structure

```
ticket-app-vue/
├── app.vue                 # Main app component with toast container
├── nuxt.config.ts         # Nuxt configuration
├── package.json           # Dependencies and scripts
├── stores/                # Pinia stores
│   ├── auth.ts           # Authentication store
│   └── tickets.ts        # Tickets management store
├── plugins/               # Vue plugins
│   └── toast.client.ts   # Toast notification plugin
├── layout/                # Layout components
│   ├── auth.vue          # Authentication layout
│   └── default.vue       # Main application layout
├── pages/                 # Page components
│   ├── index.vue         # Landing page
│   ├── sign-in.vue       # Sign-in page
│   ├── sign-up.vue       # Sign-up page
│   ├── dashboard.vue     # Dashboard page
│   └── tickets.vue       # Tickets management page
└── public/               # Static assets
```

## Key Conversions from React

### State Management

- **React**: useState, useEffect hooks
- **Vue**: Pinia stores with reactive state and computed properties

### Components

- **React**: JSX with className
- **Vue**: Template syntax with class binding

### Routing

- **React**: Next.js App Router
- **Vue**: Nuxt.js file-based routing

### Forms

- **React**: Controlled components with useState
- **Vue**: v-model with reactive refs

### Styling

- **React**: Tailwind CSS classes
- **Vue**: Identical Tailwind CSS classes

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## Authentication

The application includes mock authentication:

- **Email**: test@mail.com
- **Password**: Internal123

## Features Comparison

| Feature             | React Version | Vue Version | Status   |
| ------------------- | ------------- | ----------- | -------- |
| Landing Page        | ✅            | ✅          | Complete |
| Authentication      | ✅            | ✅          | Complete |
| Dashboard           | ✅            | ✅          | Complete |
| Ticket CRUD         | ✅            | ✅          | Complete |
| Form Validation     | ✅            | ✅          | Complete |
| Toast Notifications | ✅            | ✅          | Complete |
| Responsive Design   | ✅            | ✅          | Complete |
| Animations          | ✅            | ✅          | Complete |
| State Management    | ✅            | ✅          | Complete |

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Generate**: `npm run generate`

## Notes

- All styling and animations are identical to the React version
- State management uses Pinia instead of React hooks
- Toast notifications use Vue Toastification instead of react-toastify
- Icons use Lucide Vue Next instead of lucide-react
- The application maintains the same user experience and functionality

This Vue.js version is a complete, production-ready replica of the original React ticket management system.
