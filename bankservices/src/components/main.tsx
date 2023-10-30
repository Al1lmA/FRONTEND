import {BrowserRouter, Route, Routes} from "react-router-dom";
import Services from "./ServicesPage";
import Service from "./ServicePage";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
            <Routes>
                <Route path="services/" element={<Services/>}/>
                <Route path="services/:id" element={<Service/>} />
            </Routes>
    </BrowserRouter>
);