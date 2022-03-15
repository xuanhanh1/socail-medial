import React from 'react';
import Container from '@mui/material/Container';
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
