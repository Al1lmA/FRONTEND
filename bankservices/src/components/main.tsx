import {BrowserRouter, Route, Routes} from "react-router-dom";
import Services from "./ServicesPage";
import Service from "./ServicePage";
import ReactDOM from "react-dom/client";
import Navbar from "./NavBar/NavBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import { Provider } from "react-redux";
import store from "../store/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>

        <BrowserRouter>

            <Navbar/>
                <Routes>
                    <Route path="services/" element={<Services/>}/>
                    <Route path="services/:id" element={<Service/>} />
                    <Route path="login/" element={<LoginPage/>}/>
                    <Route path="profile/" element={<ProfilePage/>}/>
                </Routes>

        </BrowserRouter>

    </Provider>
);