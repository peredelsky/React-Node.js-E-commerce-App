import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, NavLink, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { addDeviceToBasket, fetchOneDevice } from '../http/deviceAPI'
import BasketStore from '../store/BasketStore'
import UserStore from '../store/UserStore'
import { BASKET_ROUTE } from '../utils/consts'

function DevicePage() {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams() // Хук для получения ID устройства
    const navigate = useNavigate()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const isDeviceInBasket = () => {
        const findDevice = BasketStore.basket ? BasketStore.basket.findIndex(item => Number(item.id) === Number(device.id)) : null;
        return findDevice < 0;
    }

    const addDeviceInBasket = (device) => {
        if(UserStore.isAuth) {
            addDeviceToBasket(device).then(() => BasketStore.setBasket(device, true))
        } else {
            BasketStore.setBasket(device);
        }
    }
    return (
        <Container>
            <div className='d-flex mt-4'>
                <Col md={5}>
                    <Image className={{border: '1px solid gray'}} width={420} height={420} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={7} className='mt-4'>
                    <h2 className='mb-3'>{device.name}</h2>
                    <h4 className='text-primary mb-4'>{device.price} ₽</h4>
                    { UserStore.isAuth ? 
                        isDeviceInBasket() ?
                            <Button onClick={() => addDeviceInBasket(device)}>Добавить в корзину</Button>
                            :
                            <Button onClick={() => navigate(BASKET_ROUTE)}>Перейти в корзину</Button>
                        :   
                        <Button disabled>Зарегистрируйтесь, чтобы добавить в корзину</Button>
                    }
                </Col>
            </div>
            <Row className='d-flex flex-column mt-5 ms-1'>
                <h3 className='mb-4'>Параметры товара:</h3>
                {device.info.map(info =>
                    <Row key={info.id} style={{background: info.id % 2 === 1 && '#f1f1f1', padding: 10}}>{info.title}: {info.description}</Row>)}
            </Row>
        </Container>
    )
}

export default observer(DevicePage)