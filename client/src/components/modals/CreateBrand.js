import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBrand } from '../../http/deviceAPI';

function CreateBrand({show, onHide}) {

  const [value, setValue] = useState('')
  const addBrand = () => {
    createBrand({name: value}).then(data => {
      setValue('')
      onHide()
    })
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
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder={"Введите название бренда"} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ouline-dark" onClick={onHide}>Выйти</Button>
        <Button variant="primary" onClick={addBrand}>Добавить бренд</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(CreateBrand)