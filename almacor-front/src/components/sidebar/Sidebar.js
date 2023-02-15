import DropButton from './DropButton';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import "./Sidebar.css"

function Sidebar({ sidebarOpen, setSidebarOpen, deposits }) {

    const OpenSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return(

        <>
            <div className='sidebar-cont'>
                <div className='sidebar-header'>

                    <IconButton onClick={OpenSidebar}>
                        <MenuIcon className='sidebar-icon' />
                    </IconButton>
                    <h1 className={sidebarOpen ? "sidebar-open sidebar-header-text" : "sidebar-closed"}>Depósito</h1>

                </div>

                <div className='sidebar-buttons-cont'>

                    {
                        deposits.map((deposit) => {

                            return (

                                <DropButton
                                    key={deposit.n_id_deposito}
                                    sidebarOpen={sidebarOpen}
                                    button={deposit.c_descripcion}
                                    deposit={deposit.c_descripcion}
                                    idDeposit={deposit.n_id_deposito}
                                />

                            );


                        })
                    }
                
                </div>

            </div>
        </>

    );
}

export default Sidebar;