import React from 'react'
import UserStore from '../../store/UserStore'

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import BasketLink from './BasketLink';

function NavBar() {

    const navigate = useNavigate()
    const logOut = () => {
        UserStore.setUser({})
        UserStore.setIsAuth(false)
        localStorage.removeItem('token')
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Магазин</NavLink>
                    {UserStore.isAuth ?
                        <Nav className="ml-auto">
                            <Stack direction="horizontal" gap={2}>
                            {UserStore.user.role === 'USER' 
                            ? 
                            null :
                            <span><Button className='me-2' variant={'outline-light'} onClick={() => navigate(ORDERS_ROUTE)}>Заказы</Button>
                            <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>Управление товарами</Button></span>
                            } 
                            <BasketLink />
                            <Button variant={'outline-light'} onClick={() => logOut()} className="ml-2">Выйти</Button>
                            </Stack>
                        </Nav>
                    :
                        <Nav className="ml-auto">
                            <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    }
            </Container>
        </Navbar>
    )
}

export default observer(NavBar)
