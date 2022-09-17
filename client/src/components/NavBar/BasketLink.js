import React from 'react';
import {Button, Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE} from "../../utils/consts";
import BasketStore from '../../store/BasketStore';

const BasketLink = observer(() => {
    // const {basket} = useContext(Context);
    // {basket.price}

    return (
        <div className="d-flex align-items-center mr-3">
            <NavLink to={BASKET_ROUTE} style={{flexWrap: 'nowrap', textDecoration: "none"}} className="d-flex">
                <Button variant={'outline-light'}>Корзина: {BasketStore.price} ₽</Button>
            </NavLink>
        </div>
    );
});
export default BasketLink;