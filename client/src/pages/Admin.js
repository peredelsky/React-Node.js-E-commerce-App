import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import UserStore from '../store/UserStore'

export default function Admin() {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container>
            {   
                UserStore.user.role === "USER" 
            ? 
                <h2 className='text-center mt-5'>Доступ запрещен</h2> 
            :
                <div className='d-flex'>
                    <Button onClick={() => setTypeVisible(true)} variant='outline-primary' className='mt-3 me-3 p-3'>Добавить тип</Button>
                    <Button onClick={() => setBrandVisible(true)} variant='outline-primary' className='mt-3 me-3 p-3'>Добавить бренд</Button>
                    <Button onClick={() => setDeviceVisible(true)} variant='outline-primary' className='mt-3 me-3 p-3'>Добавить устройство</Button>
                    <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                    <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                    <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                </div>                
            }
        </Container>
    )
}
