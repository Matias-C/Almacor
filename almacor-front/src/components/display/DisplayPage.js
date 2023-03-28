import { Typography } from '@mui/material';

import "./Display.css";

function DisplayPage(props) {
    return (
        <>
            <div className='display-page-header'>

                <Typography variant='h1'>{props.displayPageHeader}</Typography>

            </div>

            <div className='display-page-cont'>

                {props.children}

            </div>
        </>
    )
}

export default DisplayPage;