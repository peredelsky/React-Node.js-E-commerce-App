import React, {useState} from 'react';
import {Button, Col, ListGroup, Modal, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {fetchChangeStatusOrder, fetchDeleteOrder} from "../http/ordersAPI";
import {ORDERS_ROUTE} from "../utils/consts";

const ItemOneOrderInAdmin = ({id, complete, mobile, createdAt, updatedAt, userId, reRender}) => {
    const [modalDelete, setShowDelete] = useState(false);
    const [modalStatus, setShowStatus] = useState(false);

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const deleteOrder = () => {
        fetchDeleteOrder({id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //modal status
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);
    const changeStatusOrder = () => {
        fetchChangeStatusOrder({complete: !complete, id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
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
        <>
            <ListGroup.Item className="mt-3" key={id}>
                <Row>
                    <Col md={6}>
                        <Row>
                            <Col xs={12}>
                                <NavLink to={ORDERS_ROUTE + `/${id}`}>Id заказа: {id}</NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Телефон: <a href={`tel:${mobile}`}>{mobile}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Заказ создан: {formatDate(createdAt)}
                            </Col>
                        </Row>
                        {complete ? <Row>
                            <Col xs={12}>
                                Заказ выполнен: {formatDate(updatedAt)}
                            </Col>
                        </Row> : false}
                        <Row>
                            <Col xs={12}>
                                Статус: {complete ? "Выполнен" : "В процессе"}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row style={{height: "100%"}} className="d-flex align-items-center">
                            <Col xs={6} className="d-flex justify-content-center">
                                {complete ?
                                    <Button variant="outline-primary" onClick={handleShowStatus}>Вернуть в работу</Button>
                                    :
                                    <Button variant="primary" onClick={handleShowStatus}>Завершить заказ</Button>}
                            </Col>
                            <Col xs={6} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={handleShowDelete}>Удалить заказ</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>

            {/*modal confirm change status*/}
            <Modal show={modalStatus} onHide={handleCloseStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите изменение статуса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы собираетесь изменить статус заказа (id: {id}), с {complete ? '\'Выполнен\'' : '\'В процессе\''} на {complete ? '\'В процессе\'' : '\'Выполнен\''}?
                    <br/><br/>
                    Информация о заказе:
                    <ul>
                        <li>Телефон: {mobile}</li>
                        <li>Заказ создан: {formatDate(createdAt)}</li>
                        {complete ? `Заказ выполнен: ${formatDate(updatedAt)}` : false}
                        <li>Статус: {complete ? 'Выполнен' : `В процессе`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatus}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={changeStatusOrder}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*modal confirm delete order*/}
            <Modal show={modalDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтвердите удаление заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы собираетесь удалить заказ (id: {id})?
                    <br/><br/>
                    Информация о заказе:
                    <ul>
                        <li>Телефон: {mobile}</li>
                        <li>Заказ создан: {formatDate(createdAt)}</li>
                        {complete ? `Заказ выполнен: ${formatDate(updatedAt)}` : false}
                        <li>Статус: {complete ? 'Выполнен' : `В процессе`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={deleteOrder}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ItemOneOrderInAdmin;