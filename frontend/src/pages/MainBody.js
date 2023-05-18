import { useContext, lazy, Suspense } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import CustomerLogin from '../components/Customer/CustomerLogin'
import CustomerRegister from '../components/Customer/CustomerRegister'
import TailorLogin from '../components/Tailor/TailorLogin'
import TailorRegister from '../components/Tailor/TailorRegister'
import ShowShop from './ShowSingleShopLayout'
import ShowOrdersLayout from './ShowOrdersLayout'
import { UserState } from '../context/UserState'

import Loading from './Loading'
import AddShop from './Tailor/AddShop'
import Test from './Test'
import AddService from './Tailor/AddService'
import AddProduct from './Tailor/AddProduct'
import EditShopInfo from './Tailor/EditShopInfo'
import TailorShopProducts from './Tailor/TailorShopProducts'
import TailorShopServices from './Tailor/TailorShopServices'
import SingleProduct from './Tailor/SingleProduct'
import SingleService from './Tailor/SingleService'
import EditProduct from './Tailor/EditProduct'
import EditService from './Tailor/EditService'
import ShowAccount from './ShowAccount'
import MyPortfolio from './Tailor/MyPortfolio'
import CreatePortfolio from './Tailor/CreatePortfolio'
import EditPortfolio from './Tailor/EditPortfolio'
import ViewProductGeneral from './General/ViewProductGeneral'
import ViewServiceGeneral from './General/ViewServiceGeneral'
import Cart from './Customer/Cart'
const LoginLayout = lazy(() => import('./LoginLayout'))
const Products = lazy(() => import('./ProductsLayout'))
const RegisterLayout = lazy(() => import('./RegisterLayout'))
const Services = lazy(() => import('./ServicesLayout'))
const Shops = lazy(() => import('./ShopsLayout'))
const Tailors = lazy(() => import('./General/Tailors'))
const ContactUs = lazy(() => import('./General/ContactUs'))
const FAQs = lazy(() => import('./General/FAQs'))
const AboutUs = lazy(() => import('./General/AboutUs'))
const NotFound = lazy(() => import('./General/NotFound'))
const ServerDown = lazy(() => import('./General/ServerDown'))
const AdminLogin = lazy(() => import('../components/Admin/AdminLogin'))
const Home = lazy(() => import('./Home'))

const MainBody = () => {
    const { user_state } = useContext(UserState)
    let Location = useLocation()
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route exact path='/account'  >
                    <Route index element={<ShowAccount />} />
                </Route>

                <Route exact path='/orders' element={<ShowOrdersLayout />} />
                <Route exact path='/' element={<Home />} />
                <Route exact path='/cart' element={(user_state === 'customer') ? <Cart /> : <Navigate state={{ from: Location }} replace to='/' />} />
                <Route exact path='/test' element={<Test />} />
                <Route exact path='/tailors' element={<Tailors />} />
                <Route exact path='/services'  >
                    <Route index element={<Services />} />
                    <Route path='view/:id' element={<ViewServiceGeneral />} />
                    <Route path=':shop_id/:id' element={(user_state === 'tailor') ? <SingleService /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='edit/:shop_id/:id' element={(user_state === 'tailor') ? <EditService /> : <Navigate state={{ from: Location }} replace to='/' />} />
                </Route>

                <Route exact path='/products'  >
                    <Route index element={<Products />} />
                    <Route path='view/:id' element={<ViewProductGeneral />} />
                    <Route path=':shop_id/:id' element={(user_state === 'tailor') ? <SingleProduct /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='edit/:shop_id/:id' element={(user_state === 'tailor') ? <EditProduct /> : <Navigate state={{ from: Location }} replace to='/' />} />
                </Route>

                <Route path='/portfolio'  >
                    <Route index element={(user_state === 'tailor') ? <MyPortfolio /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='create' element={(user_state === 'tailor') ? <CreatePortfolio type='create' /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='edit' element={(user_state === 'tailor') ? <EditPortfolio type='create' /> : <Navigate state={{ from: Location }} replace to='/' />} />


                </Route>
                <Route exact path='/shops'  >
                    <Route index element={<Shops />} />
                    <Route path='add-shop' element={(user_state === 'tailor') ? <AddShop /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='view/:id' element={<ShowShop />} />
                    <Route path=':id' element={<ShowShop />} />
                    <Route path=':id/products' element={<TailorShopProducts />} />
                    <Route path=':id/services' element={<TailorShopServices />} />
                    <Route path='edit/:id' element={(user_state === 'tailor') ? <EditShopInfo /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='add-product/:id' element={(user_state === 'tailor') ? <AddProduct /> : <Navigate state={{ from: Location }} replace to='/' />} />
                    <Route path='add-service/:id' element={(user_state === 'tailor') ? <AddService /> : <Navigate state={{ from: Location }} replace to='/' />} />
                </Route>
                <Route exact path='/login' element={(user_state === 'general') ? <LoginLayout /> : <Navigate state={{ from: Location }} replace to='/' />} >
                    <Route index path='customer' element={<CustomerLogin />} />
                    <Route path='tailor' element={<TailorLogin />} />
                    <Route path='admin' element={<AdminLogin />} />
                </Route>
                <Route exact path='/register' element={(user_state === 'general') ? <RegisterLayout /> : <Navigate state={{ from: Location }} replace to='/' />} >
                    <Route index path='customer' element={<CustomerRegister />} />
                    <Route path='tailor' element={<TailorRegister />} />
                </Route>
                <Route exact path='/contact-us' element={<ContactUs />} />
                <Route exact path='/faqs' element={<FAQs />} />
                <Route exact path='/about-us' element={<AboutUs />} />
                <Route exact path='/admin' element={(user_state === 'admin') ? <Navigate state={{ from: Location }} replace to='/' /> : <AdminLogin />} />
                <Route exact path='*' element={<NotFound />} />
                <Route exact path='/server-down' element={<ServerDown />} />
            </Routes>
        </Suspense >)
}

export default MainBody