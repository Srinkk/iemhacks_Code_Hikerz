import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Navbar/Home";
import Login from "./Forms/Login";
import SignUp from "./Forms/SignUp";
import Dashboard from "./DashBoard/dashboard";
import Video from "./DashBoard/video";
import Music from "./DashBoard/music";
import Extension from "./DashBoard/Extension";
import EditProfile from "./DashBoard/EditProfile";
import { LearnMentalHealth } from "./Navbar/LearnMentalHealth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='home' element={<Home/>}/>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

				<Route path="dashboard" element={<Dashboard />} />
				<Route path="video" element={<Video />} />
				<Route path="music" element={<Music />} />
				<Route path="extension" element={<Extension />} />
				<Route path="editprofile" element={<EditProfile />} />
				<Route
					path="learn about mental health"
					element={<LearnMentalHealth />}
				/>
			</Routes>
		</div>
	);
}

export default App;
