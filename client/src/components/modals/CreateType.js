import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../../http/deviceAPI';

function CreateType({show, onHide}) {

  const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then(data => {
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
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder={"Введите название типа"} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ouline-dark" onClick={onHide}>Выйти</Button>
        <Button variant="primary" onClick={addType}>Добавить тип</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(CreateType)