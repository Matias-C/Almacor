import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Typography } from '@mui/material';

import "./Display.css";

function DisplayPage(props) {

    const handleOpenDialog = () => {
        props.setOpenDialog(true);
    }

    return (
        <>
            <div className='display-page-header'>

                <Typography variant='h1'>{props.displayPageHeader}</Typography>

                {
                    props.addButton &&
                        <Fab color="primary" size="medium" onClick={handleOpenDialog}>
                            <AddIcon />
                        </Fab>
                }

            </div>

            <div className='display-page-cont'>

                {props.children}

            </div>
        </>
    )
}

export default DisplayPage;