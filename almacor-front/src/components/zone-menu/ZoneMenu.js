import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PageContainer from '../page_container/PageContainer';

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

          <PageContainer>

            <Box sx={{ flexGrow: 1, display: 'flex', height: "100%" }}>
                <Tabs orientation="vertical" value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: 'divider' }}>

                    <LinkTab label="Órdenes" onClick={() => { navigate("ordenes"); setColor("#f4811f")}} />
                    <LinkTab label="Ubicar" onClick={() => { navigate("ubicar"); setColor("#9cc92d")}} />
                    <LinkTab label="Remover" onClick={() => { navigate("remover"); setColor("#d11c24")}} />
                    <LinkTab label="Inventario"  />

                </Tabs>

                <div className='zone-menu-content'>

                    <Outlet />
                    
                </div>

            </Box>

          </PageContainer>

        </>

    );
}

export default ZoneMenu;