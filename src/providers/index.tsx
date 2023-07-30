import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

interface ProvidersProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
}
