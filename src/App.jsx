import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import HomePage from "./features/homePage/home";
import PageNotFound from "./ui/PageNotFound";
import { AuthProvider } from "./contexts/AuthContext";
import RegesterationGuidelines from "./features/auth/RegesterationGuidelines";
// import Dashboard from "./features/dashboard/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/registration-guidelines" element={<RegesterationGuidelines />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
