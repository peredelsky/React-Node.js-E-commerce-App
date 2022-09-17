import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner, Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getOneOrderDevices} from "../http/ordersAPI";

const OneOrder = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderDevices(id).then(data => {
            setOrder(data);
            setLoading(false);
            console.log(order);
        })
    }, []);

    if(loading) {
        return <Spinner animation="border" variant="primary" style={{width: 100, height: 100, marginTop: 'auto'}} />
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("ru", options);
    }

    return (
        <Container className="d-flex flex-column mt-4">
            Id заказа: {id} <br />
            Статус: {order?.descr.complete ? "Выполнен" : "В процессе"} <br />
            Создан: {formatDate(order?.descr.createdAt)} <br />
            <a href={`tel:${order?.descr.mobile}`}>Телефон: {order?.descr.mobile}</a>
            <br />

            {order?.devices.map( ({count,descr}, i) => {
                return (
                    <Card className="mb-3">
                        <Row key={i} className="mb-2 mt-2">
                            <Col xs={2}>
                                <Image width={150} src={process.env.REACT_APP_API_URL + descr.img}/>
                            </Col>
                            <Col xs={10}>
                                Бренд: {descr.brand.name}<br />
                                Тип: {descr.type.name}<br />
                                Название: {descr.name}<br />
                                Цена: {descr.price} RUB<br />
                                Количество: {count}<br />
                                Итоговая стоимость: {count * descr.price} RUB
                            </Col>
                        </Row>
                    </Card>
                )
            })}

        </Container>
    );
};

export default OneOrder;