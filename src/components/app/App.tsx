import React from 'react';
import appStyle from './App.module.css';
import data from '../../utils/data.json';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div>
        <AppHeader />
        <div className={appStyle.wrapper}>
            <div className={appStyle.main}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
            </div>
        </div>
    </div>
  );
}

export default App;
