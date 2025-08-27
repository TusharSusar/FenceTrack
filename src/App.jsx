import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SmartGPSDashboard from "./components/SmartGPSDashboard";
import Home from "./Home";
import LoginPage from "./components/Login";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <ErrorPage/>
  },
  {
    path: "/dashboard",
    element: <SmartGPSDashboard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
