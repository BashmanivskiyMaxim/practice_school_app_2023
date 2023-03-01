import "./App.css";
import { Route, Routes } from "react-router";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <NavBar/>
      <div className="App">
      <Routes>
        <Route strict exact path="/posts" element={<Posts />} />
        <Route strict exact path="/signup" element={<Signup />} />
        <Route strict exact path="/signin" element={<Signin />} />
        <Route strict exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
