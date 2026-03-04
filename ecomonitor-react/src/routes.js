import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { MapPage } from './pages/MapPage';
import { AboutPage } from './pages/AboutPage';
import { JoinPage } from './pages/JoinPage';
import { DonatePage } from './pages/DonatePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: MapPage },
      { path: 'about', Component: AboutPage },
      { path: 'join', Component: JoinPage },
      { path: 'donate', Component: DonatePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
