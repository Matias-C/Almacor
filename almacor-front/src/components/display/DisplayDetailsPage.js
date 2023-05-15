import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Typography } from '@mui/material';

function DisplayDetailsPage(props) {

    const handleOpenDialog = () => {
        props.setOpenDialog(true);
    }

    return (
        <>
            <div className='display-details-cont'>

                <div className='display-details-header'>
                    <div className="detail">

                        <Typography variant='h4'>{props.detailsHeaderDetail}</Typography>

                    </div>

                    <Typography variant='h4'>{props.detailsHeader}</Typography>
                </div>

                {
                    props.addButton &&
                        <Fab color="primary" size="medium" onClick={handleOpenDialog} className='float-button'>
                            <AddIcon />
                        </Fab>
                }

            </div>

            <div className='display-details-content-cont'>

                {props.children}

            </div>
        </>
    );

}

export default DisplayDetailsPage;