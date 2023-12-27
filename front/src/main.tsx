import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Services from "./pages/ServicesPage/ServicesPage.tsx";
import Service from "./pages/ServicePage/ServicePage.tsx";
import Requests from "./pages/RequestsPage/RequestsPage.tsx";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import "./styles/styles.scss"
import RequestPage from "./pages/RequestPage/RequestPage.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import ServicesTable from "./pages/ServicesTablePage/ServicesTable.tsx";
import ServiceEdit from "./pages/ServiceEditPage/ServiceEdit.tsx";
import ServiceAdd from "./pages/ServiceAddPage/ServiceAdd.tsx";

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
                        <Route path="services_edit/" element={<ServicesTable/>}/>
                        <Route path="services_edit/add_new" element={<ServiceAdd/>}/>
                        <Route path="services_edit/:id" element={<ServiceEdit/>}/>
                        <Route path="services/draft/" element={<RequestPage/>}/>

                        <Route path="requests/" element={<Requests/>}/>
                        
                        <Route path="login/" element={<LoginPage/>}/>
                        <Route path="profile/" element={<ProfilePage/>}/>
                    </Routes>

                </div>
                
        </BrowserRouter>

        </Provider>

    </QueryClientProvider>
);