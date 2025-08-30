import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './index.css'
import App from './App';
import ErrorPage from './error-page';
import MessageAndComments from './pages/MessageAndComments';


const router = createBrowserRouter([
  {
    path: "/board",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/board/:postId/comments",
    element: <MessageAndComments/>,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
