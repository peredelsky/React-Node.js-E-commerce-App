import React, {useContext, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
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
        <>  
            <h2>Подтвердите ваш заказ</h2>
            <Form>
                <Form.Control
                    placeholder="Введите ваш номер телефона..."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </Form>
            <Row className="mt-3">
                <Col xs={12}>
                    <Button onClick={buy}>Подтвердить заказ</Button>
                </Col>
            </Row>
        </>
    );
};

export default Ordering;