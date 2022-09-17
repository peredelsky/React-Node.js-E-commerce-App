import { observer } from 'mobx-react-lite'
import React from 'react'
import { Row } from 'react-bootstrap'
import DeviceStore from '../store/DeviceStore'
import DeviceItem from './DeviceItem'

function DeviceList(props) {
    return (
        <Row className='d-flex mt-4'>
            {DeviceStore.devices.length > 0 ? DeviceStore.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            ) : <p>Товары не найдены</p>}
        </Row>
    )
}

export default observer(DeviceList)