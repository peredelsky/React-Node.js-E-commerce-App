import React, {useContext, useState} from 'react';
import {Button, Col, Form, Row, Card, Container} from "react-bootstrap";
import {sendOrder} from "../http/ordersAPI";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import UserStore from '../store/UserStore';
import BasketStore from '../store/BasketStore';

const Ordering = () => {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const buy = () => {
        let order = {
            mobile: phone,
            basket: BasketStore.basket
        }

        if(UserStore.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            BasketStore.setDeleteAllDeviceFromBasket();
            navigate(SHOP_ROUTE);
        });
    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 100}}>
            <Card style={{width: 600}} className="p-4">
                <h2>Подтвердите ваш заказ</h2>
                <Form className='mb-3 mt-2'>
                    <Form.Control
                        placeholder="Введите ваш номер телефона..."
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </Form>
                <Row className="mt-2">
                    <Col xs={12}>
                        <Button onClick={buy}>Подтвердить заказ</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Ordering;