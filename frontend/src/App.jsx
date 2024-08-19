import { Routes, Route } from "react-router-dom";
import SingupPage from "./pages/SingupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import RedirectAuthenticatedUser from "./components/RedirectAuthenticatedUser";
import FloatingComponent from "./components/FloatingComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import LoadingSpinner from "./components/LoderSpinner";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  
  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div
      className="min-h-screen 
  bg-gradient-to-br  from-gray-700 via-gray-500 to-gray-300 
  flex items-center justify-center relative overflow-hidden"
    >
      <FloatingComponent />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Singup"
          element={
            <RedirectAuthenticatedUser>
              <SingupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/Email-verification" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
           </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            //<RedirectAuthenticatedUser>
              <ResetPassword />
            //</RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
