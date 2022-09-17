import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Container, Form, Card, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import UserStore from '../store/UserStore'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'

function Auth() {
    
    const location = useLocation() // Получаем содержимое адресной строки
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const enter = async () => {
        try {
            let data;
            if(isLoginPath) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            UserStore.setUser(data)
            UserStore.setIsAuth(true)
            navigate(SHOP_ROUTE)

        } catch (e) {
            alert(e)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 100}}>
            <Card style={{width: 600}} className="p-4">
                <h2 className="m-auto">{isLoginPath ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column mt-4">
                    <Form.Control 
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between">
                        {isLoginPath ?
                            <span className='mt-3'>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </span>
                        : 
                            <span className='mt-3'>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </span>
                        }
                        <Button
                            variant='outline-primary'
                            className="mt-4 p-2 ps-5 pe-5 align-self-end"
                            onClick={enter}
                            >
                            {isLoginPath? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Row>


                </Form>
            </Card>
        </Container>
    )
}

export default observer(Auth)