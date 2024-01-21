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

            <BrowserRouter>

                <Navbar />

                <Breadcrumbs />

                <div className="content-wrapper">

                    <Routes>
                        <Route path="/" element={<Navigate to="/services" replace />} />

                        <Route path="services/" element={<Services/>}/>
                        <Route path="services/:id" element={<Service/>}/>
                        {/* <Route path="services_edit/" element={<ServicesTable/>}/>
                        <Route path="services_edit/add_new" element={<ServiceAdd/>}/>
                        <Route path="services_edit/:id" element={<ServiceEdit/>}/>
                        

                        <Route path="requests/" element={<Requests/>}/>
                        <Route path="requests/:id" element={<RequestPage/>}/>
                        
                        <Route path="login/" element={<LoginPage/>}/>
                        <Route path="profile/" element={<ProfilePage/>}/> */}
                    </Routes>

                </div>
                
        </BrowserRouter>

        </Provider>

    </QueryClientProvider>
);