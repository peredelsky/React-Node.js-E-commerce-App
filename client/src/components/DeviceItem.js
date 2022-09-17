import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'


function DeviceItem({device}) {
    const navigate = useNavigate() // Хук для реализации карточки товара с динамическими данными

    return (
        <Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 180, cursor: 'pointer'}} className='mb-4'>
                <Image className='mt-3' width={170} height={170} src={process.env.REACT_APP_API_URL + device.img} />
                <hr/>
                <div className='ms-2 mb-2'>
                    <div style={{color: 'gray'}}>{device.brand.name}</div>
                    <p className='text-primary'>{device.name}</p>
                    <div>{device.price} ₽</div>
                </div>

            </Card>
        </Col>
    )
}

export default observer(DeviceItem)
