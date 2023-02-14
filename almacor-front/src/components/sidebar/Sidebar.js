import DropButton from './DropButton';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import "./Sidebar.css"

function Sidebar({ sidebarOpen, setSidebarOpen }) {

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

                    <DropButton
                        sidebarOpen={sidebarOpen}
                        button="Secos"
                        deposit="secos"
                    />

                    <DropButton
                        sidebarOpen={sidebarOpen}
                        button="Lácteos"
                        deposit="lacteos"
                    />
                
                </div>

            </div>
        </>

    );
}

export default Sidebar;