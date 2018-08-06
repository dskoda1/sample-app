// @flow

import React from 'react';

import logo from '../wc_trophy.svg';
import './header.css';

const header = () => (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">FIFA 2018 World Cup Coverage</h1>
    </header>
);


export default header;