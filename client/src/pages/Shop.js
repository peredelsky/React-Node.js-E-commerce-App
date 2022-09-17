import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import DeviceStore from '../store/DeviceStore'

function Shop() {
    useEffect(() => {
        fetchTypes().then(data => DeviceStore.setTypes(data))
        fetchBrands().then(data => DeviceStore.setBrands(data))
        fetchDevices(null, null, 1, 9).then(data => {
            DeviceStore.setDevices(data.rows);
            DeviceStore.setTotalCount(data.count);
        });
    }, [])

    useEffect(() => {
        fetchDevices(DeviceStore.selectedType.id, DeviceStore.selectedBrand.id, DeviceStore.page, 4).then(data => {
            DeviceStore.setDevices(data.rows)
            DeviceStore.setTotalCount(data.count)
        })
    }, [DeviceStore.page, DeviceStore.selectedType, DeviceStore.selectedBrand])
    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
}

export default observer(Shop)
