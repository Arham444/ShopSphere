import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <Navbar />
      <main style={{ padding: isLoginPage ? "0" : "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
