import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import AppRouter from "./Router/AppRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      offset: 0,
    });
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
