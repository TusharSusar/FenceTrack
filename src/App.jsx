import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SmartGPSDashboard from "./components/SmartGPSDashboard";
import Home from "./Home";
import LoginPage from "./components/Login";
import Product from "./components/Product";
import './App.css';
import NotFoundPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/dashboard",
    element: <SmartGPSDashboard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path:'.products',
    element:<Product/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
