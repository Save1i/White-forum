import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './index.css'
import App from './App';
import ErrorPage from './error-page';
import MessageAndComments from './pages/MessageAndComments';
import LogIn from './components/LogIn';
import Profile from './pages/profile';


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
  {
    path: "/user/log-in",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/:id",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
