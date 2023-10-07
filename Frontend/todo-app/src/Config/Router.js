import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoScreen from '../Screens/TodoScreen';

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TodoScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;