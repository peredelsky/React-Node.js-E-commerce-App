import { observer } from 'mobx-react-lite'
import React from 'react'
import {Route, Redirect, Routes} from 'react-router-dom'
import NotFound from '../pages/NotFound'
import { authRoutes, publicRoutes } from '../routes'
import UserStore from '../store/UserStore'
import { SHOP_ROUTE } from '../utils/consts'

const AppRouter = observer(() => {
    return (
        <Routes>
            {UserStore.isAuth && authRoutes.map(({path, component}) => 
                (<Route key={path} path={path} element={component} exact />)
            )}
            
            {publicRoutes.map(({path, component}) => 
                (<Route key={path} path={path} element={component} exact />)
            )}


            <Route path='*' element={<NotFound/>} />
        </Routes>
        // Указываем несколько маршрутов, если не сработал ни один из них, срабатывает последний из списка
    )
})

export default AppRouter