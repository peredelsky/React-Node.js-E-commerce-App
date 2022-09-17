import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { check } from './http/userAPI';
import BasketStore from './store/BasketStore';
import UserStore from './store/UserStore';
import {getDeviceFromBasket} from "./http/deviceAPI";

function App() {

  const [loading, setLoading] = useState(true)

  // проверка аккаунта
  useEffect(() => {
    setLoading(true);
    check().then(data => {
        UserStore.setUser(data);
        UserStore.setIsAuth(true);
    }).finally(() => {
        setLoading(false);
    })
  }, []);

  // загрузка корзины
  useEffect(() => {
    if(UserStore.isAuth === false) {
        BasketStore.setDeleteAllDeviceFromBasket();
        const savedBasket = JSON.parse(localStorage.getItem("basket"));
        for (let key in savedBasket) {
          BasketStore.setBasket(savedBasket[key]);
        }
    } else if(UserStore.isAuth === true){
        BasketStore.setDeleteAllDeviceFromBasket();
        getDeviceFromBasket().then(data => {
            for (let key in data) {
                BasketStore.setBasket(data[key], true);
            }
        })
    }
  }, [BasketStore, UserStore.isAuth]);

  if (loading) {
    return <Spinner animation="border" variant="primary" style={{width: 100, height: 100, marginTop: 'auto'}} />
  }

  return (
    <div className="App">
        <NavBar />
        <AppRouter />
    </div>
  );
}

export default observer(App);
