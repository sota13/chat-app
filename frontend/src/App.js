import { Fragment } from "react";
import {Routes ,Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import './styles/main.scss';
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Layout from "./pages/Layout/Layout";
import ModalPage from "./components/Modal/ModalPage";
import OnlyRegisterd from "./pages/Layout/OnlyRegisterd";
import UserProfile from "./pages/UserProfile/UserProfile";
import UpdateProfile from "./pages/UserProfile/UpdateProfile";


function App() {

  
  return (
    <Fragment>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/modal" element={<ModalPage />}/>
        </Route>
        <Route element={<OnlyRegisterd/>}>
          <Route path="/" element={<Home />}/>
          <Route path="/chat-room/:room_id" element={<ChatRoom />}/>
          <Route path="/profile/:user_id" element={<UserProfile />}/>
          <Route path="/update-profile/:user_id" element={<UpdateProfile />}/>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
