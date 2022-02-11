import React from 'react';
import Container from '@mui/material/Container';
import Header from '../compoments/Header/Header';
import HomePage from '../compoments/HomePage/HomePage'
import { Outlet } from 'react-router-dom';
function ContainerAnimal() {
    return <div className="bd">
        <div style={{ backgroundColor: '#e2e8f0' }}>
            <Container  >
                <Outlet />
            </Container>
        </div>
    </div>
}

export default ContainerAnimal;
