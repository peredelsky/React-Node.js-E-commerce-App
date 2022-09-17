import React from 'react';
import {observer} from "mobx-react-lite";

import {Button, Col, Image, Row} from "react-bootstrap";
import BasketItem from "../components/BasketItem";

import {ORDERING_ROUTE} from "../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import BasketStore from '../store/BasketStore';

const BasketCard = () => {

    const navigate = useNavigate()

    if(BasketStore.basket.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <h2>Корзина пуста</h2>
            </div>
        )
    }

    return (
        <Row className="mt-4">
            <Col xs={12}>
                {BasketStore.basket.map(device => <BasketItem key={device.id} device={device}/>)}
            </Col>
            <div className='text-center mt-4'>
                <Button onClick={() => navigate(ORDERING_ROUTE)} className='text pt-3 pb-3 ps-4 pe-4 mb-3'>Оформить заказ</Button>
            </div>
        </Row>
    );
};

export default observer(BasketCard);