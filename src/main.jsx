import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import './styles/index.css';

// Marketing site is the home route ("/"). The legal pages exist as their own
// routes so they have stable, submittable URLs (used for SMS/A2P compliance);
// they are intentionally not linked from the nav.
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
