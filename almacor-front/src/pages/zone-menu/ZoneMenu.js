import { useState } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import "./ZoneMenu.css"

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <h2>{children}</h2>
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

function a11yProps(index) {
    return {

        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,

    };
}


function ZoneMenu() {
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function setColor(color) {
        document.documentElement.style.setProperty('--tab-color', color)
    }

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>

                    <Tab className='zone-menu-tab' label="Órdenes" {...a11yProps(0)} onClick={() => setColor('#f4811f')} />
                    <Tab label="Ubicar" {...a11yProps(1)} onClick={() => setColor('#9cc92d')} />
                    <Tab label="Quitar" {...a11yProps(2)} onClick={() => setColor('#d11c24')} />
                    <Tab label="Iventario" {...a11yProps(3)} onClick={() => setColor('#e7e80f')} />
                    
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>

            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>

            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
        </Box>
    );
}

export default ZoneMenu;