import { createBrowserRouter } from "react-router";
import Profile from "../modules/auth/pages/Profile";
import Register from "../modules/auth/pages/register";

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

export default router;