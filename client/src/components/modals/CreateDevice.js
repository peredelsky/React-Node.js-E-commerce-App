import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';
import DeviceStore from '../../store/DeviceStore';

function CreateDevice({show, onHide}) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then(data => DeviceStore.setTypes(data))
    fetchBrands().then(data => DeviceStore.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', id: Date.now()}])
  }
  const removeInfo = (id) => {
    setInfo(info.filter(i => i.id !== id))
  }
  const changeInfo = (key, value, id) => {
    setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
  }
  const selectFile = e => {
    setFile(e.target.files[0]) // В массиве из одного элемента, выбираем первый элемент 
  }
  const addDevice = () => {
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`) // Значение обязательно должно быть строковым
    formData.append('img', file)
    formData.append('brandId', DeviceStore.selectedBrand.id)
    formData.append('typeId', DeviceStore.selectedType.id)
    formData.append('info', JSON.stringify(info)) // Нельзя передать массив, мы передаем строку и парсим её на сервере
    createDevice(formData).then(data => onHide())

    createDevice()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant='outline-primary'>{DeviceStore.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {DeviceStore.types.map(type =>
                  <Dropdown.Item 
                    onClick={() => DeviceStore.setSelectedType(type)} 
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>  
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle variant='outline-primary'>{DeviceStore.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {DeviceStore.brands.map(brand =>
                  <Dropdown.Item 
                    onClick={() => DeviceStore.setSelectedBrand(brand)} 
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>  
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Form.Control value={name} onChange={e => setName(e.target.value)} className="mt-3" placeholder={"Введите название устройства"} />
            <Form.Control value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-3" placeholder={"Введите цену устройства"} type="number" />
            <Form.Control onChange={selectFile} className="mt-3" type='file' />
            <hr className='mt-3 mb-4'/>

            {info.map(i =>
              <Row className='mb-2' key={i.id}>
                <Col md={5}>
                  <Form.Control
                    value={i.title} 
                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                    placeholder={"Название свойства"}
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    value={i.description} 
                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                    placeholder={"Описание свойства"} 
                  />
                </Col>
                <Col md={1}>
                  <Button onClick={() => removeInfo(i.id)} variant='outline-aaa' style={{color: 'gray'}}>x</Button>
                </Col>
              </Row>  
            )}
            <Button className='mt-3 mb-2' variant='outline-primary' onClick={addInfo}>Добавить новое свойство</Button>




        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ouline-dark" onClick={onHide}>Выйти</Button>
        <Button variant="primary" onClick={addDevice}>Добавить устройство</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(CreateDevice)



// import React, {useContext, useEffect, useState} from 'react';
// import Modal from "react-bootstrap/Modal";
// import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
// import {Context} from "../../index";
// import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
// import {observer} from "mobx-react-lite";
// import DeviceStore from '../../store/DeviceStore';

// const CreateDevice = observer(({show, onHide}) => {
//     const [name, setName] = useState('')
//     const [price, setPrice] = useState(0)
//     const [file, setFile] = useState(null)
//     const [info, setInfo] = useState([])

//     useEffect(() => {
//         fetchTypes().then(data => DeviceStore.setTypes(data))
//         fetchBrands().then(data => DeviceStore.setBrands(data))
//     }, [])

//     const addInfo = () => {
//         setInfo([...info, {title: '', description: '', number: Date.now()}])
//     }
//     const removeInfo = (number) => {
//         setInfo(info.filter(i => i.number !== number))
//     }
//     const changeInfo = (key, value, number) => {
//         setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
//     }

//     const selectFile = e => {
//         setFile(e.target.files[0])
//     }

//     const addDevice = () => {
//         const formData = new FormData()
//         formData.append('name', name)
//         formData.append('price', `${price}`)
//         formData.append('img', file)
//         formData.append('brandId', DeviceStore.selectedBrand.id)
//         formData.append('typeId', DeviceStore.selectedType.id)
//         formData.append('info', JSON.stringify(info))
//         createDevice(formData).then(data => onHide())
//         console.log(info)
//     }

//     return (
//         <Modal
//             show={show}
//             onHide={onHide}
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Добавить устройство
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Dropdown className="mt-2 mb-2">
//                         <Dropdown.Toggle>{DeviceStore.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             {DeviceStore.types.map(type =>
//                                 <Dropdown.Item
//                                     onClick={() => DeviceStore.setSelectedType(type)}
//                                     key={type.id}
//                                 >
//                                     {type.name}
//                                 </Dropdown.Item>
//                             )}
//                         </Dropdown.Menu>
//                     </Dropdown>
//                     <Dropdown className="mt-2 mb-2">
//                         <Dropdown.Toggle>{DeviceStore.selectedBrand.name || "Выберите тип"}</Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             {DeviceStore.brands.map(brand =>
//                                 <Dropdown.Item
//                                     onClick={() => DeviceStore.setSelectedBrand(brand)}
//                                     key={brand.id}
//                                 >
//                                     {brand.name}
//                                 </Dropdown.Item>
//                             )}
//                         </Dropdown.Menu>
//                     </Dropdown>
//                     <Form.Control
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         className="mt-3"
//                         placeholder="Введите название устройства"
//                     />
//                     <Form.Control
//                         value={price}
//                         onChange={e => setPrice(Number(e.target.value))}
//                         className="mt-3"
//                         placeholder="Введите стоимость устройства"
//                         type="number"
//                     />
//                     <Form.Control
//                         className="mt-3"
//                         type="file"
//                         onChange={selectFile}
//                     />
//                     <hr/>
//                     <Button
//                         variant={"outline-dark"}
//                         onClick={addInfo}
//                     >
//                         Добавить новое свойство
//                     </Button>
//                     {info.map(i =>
//                         <Row className="mt-4" key={i.number}>
//                             <Col md={4}>
//                                 <Form.Control
//                                     value={i.title}
//                                     onChange={(e) => changeInfo('title', e.target.value, i.number)}
//                                     placeholder="Введите название свойства"
//                                 />
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Control
//                                     value={i.description}
//                                     onChange={(e) => changeInfo('description', e.target.value, i.number)}
//                                     placeholder="Введите описание свойства"
//                                 />
//                             </Col>
//                             <Col md={4}>
//                                 <Button
//                                     onClick={() => removeInfo(i.number)}
//                                     variant={"outline-danger"}
//                                 >
//                                     Удалить
//                                 </Button>
//                             </Col>
//                         </Row>
//                     )}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
//                 <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// });

// export default CreateDevice;