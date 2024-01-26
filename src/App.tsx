import React, {useEffect, useState} from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/homePage";
import {useAppDispatch, useAppSelector} from "./hooks";
import {getHomePage} from "./redux/reducers/homePageSlice";
import SinglePage from "./components/singlePage";


function App() {

  return (
        <Routes>
            <Route path='/' element={ <Layout  /> } >
                <Route index element={ <HomePage /> } />
                <Route path='country/:title' element={ <SinglePage /> } />
            </Route>
        </Routes>
  );
}

export default App;
