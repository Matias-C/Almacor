import { useState } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Orders from '../../pages/orders/Orders';
import OrderDetails from '../../pages/orders/OrderDetails';

import "./ZoneMenu.css"

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (

                <Box>
                    {children}
                </Box>

            )}

        </div>
    );

}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function ZoneMenu() {
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function setColor(color) {
        document.documentElement.style.setProperty('--tab-color', color)
    }

    return (

        <>

            <h1 className="page-content-header"><span className="header-deposit">Secos</span> <span className="header-zone">/ Zona 1</span></h1>

            <Box className="zone-menu-tab-cont">

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>

                        <Tab label="Órdenes" onClick={() => setColor('#f4811f')} />
                        <Tab label="Ubicar"  onClick={() => setColor('#9cc92d')} />
                        <Tab label="Quitar"  onClick={() => setColor('#d11c24')} />
                        <Tab label="Iventario"  onClick={() => setColor('#e7e80f')} />
                        
                    </Tabs>
                </Box>

                <TabPanel className="zone-menu-tab" value={value} index={0}>

                    <Orders />
                    
                </TabPanel>

                <TabPanel className="zone-menu-tab" value={value} index={1}>
                    
                    <OrderDetails />

                </TabPanel>

                <TabPanel className="zone-menu-tab" value={value} index={2}>
                    Item Three
                </TabPanel>

                <TabPanel className="zone-menu-tab" value={value} index={3}>
                    Item Four
                </TabPanel>
                
            </Box>

        </>

        
    );
}

export default ZoneMenu;