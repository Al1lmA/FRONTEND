import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Services from "./pages/ServicesPage/ServicesPage.js";
import Service from "./pages/ServicePage/ServicePage.js";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Navbar from "./components/Navbar/Navbar.js";
import "./styles/styles.scss"
import {QueryClient, QueryClientProvider} from "react-query";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs.js";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>

        <Provider store={store}>

            <BrowserRouter basename='/FRONTEND/'>

                <Navbar />

                <Breadcrumbs />

                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Navigate to="/services" replace />} />

                        <Route path="services/" element={<Services/>}/>
                        <Route path="services/:id" element={<Service/>}/>

                    </Routes>

                </div>
                
        </BrowserRouter>

        </Provider>

    </QueryClientProvider>
);