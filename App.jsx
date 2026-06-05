// ICONIC HUB - Root App Component
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { TransitionProvider } from './components/TransitionContext';

export default function App() {
  return (
    <TransitionProvider>
      <RouterProvider router={router} />
    </TransitionProvider>
  );
}
