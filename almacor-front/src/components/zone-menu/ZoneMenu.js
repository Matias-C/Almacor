import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import "./ZoneMenu.css"


function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }
  
function ZoneMenu() {

    const navigate = useNavigate();

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

            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange}>

                    <LinkTab label="Órdenes" onClick={() => { navigate("ordenes"); setColor("#f4811f")}} />
                    <LinkTab label="Añadir" onClick={() => { navigate("añadir"); setColor("#9cc92d")}} />
                    <LinkTab label="Remover" onClick={() => { navigate("remover"); setColor("#d11c24")}} />
                    <LinkTab label="Inventario"  />

                </Tabs>

                <div className='zone-menu-content'>

                    <Outlet />
                    
                </div>

            </Box>

        </>

    );
}

export default ZoneMenu;