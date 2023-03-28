import { Typography } from '@mui/material';

function DisplayDetailsPage(props) {

    return (
        <>
            <div className='display-details-header'>

                <div className="detail">

                    <Typography variant='h3'>{props.detailsHeaderDetail}</Typography>

                </div>

                <Typography variant='h3'>{props.detailsHeader}</Typography>

            </div>

            <div className='display-details-content-cont'>

                {props.children}

            </div>
        </>
    );

}

export default DisplayDetailsPage;