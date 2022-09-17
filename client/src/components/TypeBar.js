import { observer } from "mobx-react-lite"
import { ListGroup } from "react-bootstrap"
import DeviceStore from "../store/DeviceStore"

function TypeBar(props) {

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: 'pointer'}} 
                active={DeviceStore.selectedType === 'all'}
                onClick={() => DeviceStore.setSelectedType('all')}
            >
                Все категории
            </ListGroup.Item>
            {DeviceStore.types.map(type => 
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    active={type.id === DeviceStore.selectedType.id}  
                    key={type.id}
                    onClick={() => DeviceStore.setSelectedType(type)}         
                >
                    {type.name}
                </ListGroup.Item>    
            )}
        </ListGroup>
    )
}

export default observer(TypeBar)
