import {BrowserRouter, Route, Routes} from "react-router-dom";
import Services from "./ServicesPage";
import Service from "./ServicePage";
import ReactDOM from "react-dom/client";
import Navbar from "./NavBar/NavBar";
import LoginPage from "../pages/LoginPage/LoginPage";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="services/" element={<Services/>}/>
                <Route path="services/:id" element={<Service/>} />
                <Route path="login/" element={<LoginPage/>}/>
            </Routes>
    </BrowserRouter>
);