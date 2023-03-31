import { useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import WrongLocationRoundedIcon from '@mui/icons-material/WrongLocationRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

import PageContainer from '../page_container/PageContainer';
import BackButton from '../back-button/BackButton';

import ContextConnected from '../../context/ContextConnected';

import "./ZoneMenu.css"
  
function ZoneMenu() {

    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [page, setPage] = useState("orders")
    
    return (
        <>
          <PageContainer>
          
            <div className='zone-menu-cont'>

              <div className={Connected.openSideBar ? 'zone-menu-side-bar open' : "zone-menu-side-bar"}>

                <Button 
                  variant={page === "orders" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    Connected.setOpenSideBar(false);
                    navigate("ordenes");
                    setPage("orders");
                  }}
                >
                  <LocalShippingRoundedIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Órdenes' : ""}
                </Button>

                <Button 
                  variant={page === "locate" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    Connected.setOpenSideBar(false);
                    navigate("ubicar");
                    setPage("locate");
                  }}
                >
                  <AddLocationAltRoundedIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Ubicar' : ""}
                </Button>

                <Button 
                  variant={page === "remove" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    Connected.setOpenSideBar(false);
                    navigate("remover");
                    setPage("remove");
                  }}
                >
                  <WrongLocationRoundedIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Remover' : ""}
                </Button>

                <Button 
                  variant={page === "inventory" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    Connected.setOpenSideBar(false);
                    navigate("inventario");
                    setPage("inventory");
                  }}
                >
                  <ViewQuiltRoundedIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Inventario' : ""}
                </Button>

              </div>

              <div className='zone-menu-content'>

                    <div className='page-header'>

                      <BackButton />
                      <Typography variant="h4" className='zone-menu-header'>{Connected.currentDeposit.toUpperCase()} / {Connected.currentZone.toUpperCase()}</Typography>

                    </div>

                    <Outlet />
                    
                </div>

            </div>

          </PageContainer>
        </>
    );
}

export default ZoneMenu;