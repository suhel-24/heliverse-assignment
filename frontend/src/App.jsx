import { BrowserRouter as Router, Routes, Route ,Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import Team from "./pages/Team";
import { Toaster } from "react-hot-toast";

const Layout = () => (
  <div className="flex flex-col md:flex-row items-center h-screen w-full md:overflow-y-hidden">
    <Toaster toastOptions={{ duration: 4000 }} />
    <Sidebar />
    <Outlet />
    <div className="hidden md:flex h-full basis-[40%] bg-[#1E212A]">
      <Profile />
    </div>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="/team" element={<Team />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/adduser" element={<AddUser />} />

      <Route path="/create-team" element={<Layout />}>
        <Route index element={<Profile />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </Router>
);

export default App;
