import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import WrongLocationRoundedIcon from '@mui/icons-material/WrongLocationRounded';
import SearchIcon from '@mui/icons-material/Search';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

import PageContainer from '../page_container/PageContainer';
import BackButton from '../back-button/BackButton';

import ContextConnected from '../../context/ContextConnected';

import "./ZoneMenu.css"
  
function ZoneMenu() {

    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [handleOpenSideBar, setHandleOpenSideBar] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    useEffect(() => {
      const handleSideBar = () => {
        if (handleOpenSideBar && windowWidth > 768) {
          Connected.setOpenSideBar(true);
          setHandleOpenSideBar(false);
        } else if (!handleOpenSideBar && windowWidth < 768) {
          Connected.setOpenSideBar(false);
          setHandleOpenSideBar(true);
        }
      }
      handleSideBar();
    },[Connected, handleOpenSideBar, windowWidth])

    const [page, setPage] = useState("")

    useEffect(() => {
      const getUrl = () => {
        const currentUrl = window.location.href.toString();
        if (currentUrl.includes("ordenes")) {
          setPage("orders");
        } else if (currentUrl.includes("ubicar")) {
          setPage("locate");
        } else if (currentUrl.includes("remover")) {
          setPage("remove");
        } else if (currentUrl.includes("localizar")) {
          setPage("find");
        } else if (currentUrl.includes("inventario")) {
          setPage("inventory");
        }
      }
      getUrl();
    },[])

    const handleOpen = (e) => {
      e.stopPropagation();
      Connected.setOpenSideBar(false);
    }

    const handleClose = () => {
      if (windowWidth < 768) {
        Connected.setOpenSideBar(false);
      } else {
        return null;
      }
    }

    const stopPropagation = (e) => {
      e.stopPropagation();
    }

    return (
      <>
        <PageContainer>
          <div className='zone-menu-cont'>
            <div className={Connected.openSideBar ? 'zone-menu-side-bar-bg open' : "zone-menu-side-bar-bg"} onClick={(e) => {handleOpen(e)}}>

              <div className={Connected.openSideBar ? 'zone-menu-side-bar open' : "zone-menu-side-bar"} onClick={(e) => {stopPropagation(e)}}>

                <Button 
                  variant={page === "orders" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    handleClose();
                    navigate("ordenes", {replace: true});
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
                    handleClose();
                    navigate("ubicar", {replace: true});
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
                    handleClose();
                    navigate("remover" ,{replace: true});
                    setPage("remove");
                  }}
                >
                  <WrongLocationRoundedIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Remover' : ""}
                </Button>

                <Button 
                  variant={page === "find" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    handleClose();
                    navigate("localizar" ,{replace: true});
                    setPage("find");
                  }}
                >
                  <SearchIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Localizar' : ""}
                </Button>

                <Button 
                  variant={page === "inventory" ? "contained" : "text"}
                  size="large"
                  disableElevation
                  fullWidth
                  className='zone-menu-side-bar-button'
                  onClick={() => {
                    handleClose();
                    navigate("inventario", {replace: true});
                    setPage("inventory");
                  }}
                >
                  <ViewQuiltRoundedIcon className={Connected.openSideBar ?'zone-menu-side-bar-icon open' : "zone-menu-side-bar-icon"}/>
                  {Connected.openSideBar ? 'Inventario' : ""}
                </Button>

              </div>
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