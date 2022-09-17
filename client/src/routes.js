import Admin from "./pages/Admin"
import Orders from "./pages/Orders"
import Auth from "./pages/Auth"
import BasketCard from "./pages/BasketCard"
import DevicePage from "./pages/DevicePage"
import OneOrder from "./pages/OneOrder";
import DevicePageEdit from "./pages/DevicePageEdit";
import Ordering from "./pages/Ordering";
import Shop from "./pages/Shop"


import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, DEVICE_EDIT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ORDERING_ROUTE, ORDERS_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin/>
    },
    {
        path: ORDERS_ROUTE,
        component: <Orders/>
    },
    {
        path: ORDERS_ROUTE + '/:id',
        component: <OneOrder/>
    },
    {
        path: DEVICE_EDIT_ROUTE + '/:id',
        component: <DevicePageEdit/>
    },
    {
        path: BASKET_ROUTE,
        component: <BasketCard/>
    },

]

export const publicRoutes = [
    {
        path: ORDERING_ROUTE,
        component: <Ordering/>
    },
    {
        path: SHOP_ROUTE,
        component: <Shop/>
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        component: <DevicePage/>
    },
]

// Первый массив — роуты только для авторизованных пользователей, второй — доступные всем