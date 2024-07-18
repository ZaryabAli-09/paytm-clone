import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send" element={<SendMoney />} />
              <Route path="/*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
