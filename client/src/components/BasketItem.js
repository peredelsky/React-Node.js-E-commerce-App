import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import BasketStore from '../store/BasketStore';
import UserStore from '../store/UserStore';



const OneItemInBasket = ({device}) => {

    return (
        <Card key={device.id} style={{width: "100%"}} className="mb-3 container">
            <Card.Body>
                <Row>
                    <Col xs={3}>
                        <Image src={process.env.REACT_APP_API_URL + device.img} style={{width: "100%", maxWidth: 250}} />
                    </Col>
                    <Col xs={6}>
                        <Row className='mb-5'>
                            <Col xs={12}>
                                <NavLink style={{fontSize: 20}} to={`/device/${device.id}`}>{device.name}</NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <b>Характеристики:</b><br/><br/>
                                {device.info && device.info.length !== 0? device.info.map((info, i) => {

                                    if(i % 2 === 1 ) {
                                        return (
                                            <Row key={info.id}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{backgroundColor: '#f1f1f1'}}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Характеристики не указаны"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={3}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {UserStore.isAuth ? <Button variant="outline-dark" onClick={() => BasketStore.setDeleteItemBasket(device, true)}>Удалить из корзины</Button>
                                    : <Button variant="outline-dark" onClick={() => BasketStore.setDeleteItemBasket(device)}>Delete from Cart</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Количество:
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={() => BasketStore.setCountDevice(device.id, "+")}>+</Button>
                                <input className="ms-2 me-2 ps-2 pe-2" style={{width: "20%"}} type="number" onChange={e => BasketStore.setCountDevice(Number(e.target.value))} value={device.count}/>
                                <Button variant="outline-dark" onClick={() => BasketStore.setCountDevice(device.id, "-")}>-</Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Стоимость: {device.price * device.count} ₽
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
)};

export default OneItemInBasket;