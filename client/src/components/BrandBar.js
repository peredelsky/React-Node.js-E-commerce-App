import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Row, Stack } from 'react-bootstrap'
import DeviceStore from '../store/DeviceStore'

function BrandBar(props) {
    

    return (
        <Row className="d-flex">
            <Stack direction="horizontal" gap={3} style={{width: 'auto'}}>
            <Card 
                style={{cursor: 'pointer'}} 
                className='mb-3 p-2'
                onClick={() => DeviceStore.setSelectedBrand('all')}
                border={DeviceStore.selectedBrand === 'all' ? 'dark': 'gray'}
            >
                Все бренды
            </Card>
            {DeviceStore.brands.map(brand => 
                    <Card
                        key={brand.id} 
                        style={{cursor: 'pointer'}}
                        className='mb-3 p-2'
                        onClick={() => DeviceStore.setSelectedBrand(brand)}
                        border={brand.id === DeviceStore.selectedBrand.id ? 'dark': 'gray'}
                    >
                        {brand.name}
                    </Card>   
            )}
            </Stack>
        </Row>
    )
}

export default observer(BrandBar)