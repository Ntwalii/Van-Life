import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
   Routes,
   Route,
   Link,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans,{loader as vansLoader} from "./pages/Vans/Vans"
import VanDetail, {loader as vanDetailLoader}  from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, {loader as hostVansLoader} from "./pages/Host/HostVans"
import HostVanDetail, {loader as hostVanDetailsLoader} from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import NotFound from './pages/NotFound';
import Error from './components/Error';
import "./server"
import { requireAuth } from './utils';
import Login from './pages/Login'
function App() {

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" errorElement={<Error />} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="vans" 
          loader={vansLoader} 
          element={<Vans />} />
          <Route path="vans/:id" loader={vanDetailLoader} element={<VanDetail />} />
          <Route path="*" element={<NotFound />} />
          
          <Route path="host" loader={async()=>{
            await requireAuth()
          }} element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" loader={hostVansLoader} element={<HostVans />} />
            <Route path="vans/:id" loader={hostVanDetailsLoader} element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
        </Route>
  ))
  return (
    <RouterProvider router={router}/>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);