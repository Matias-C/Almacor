import { useState } from 'react';

import ZoneButton from './ZoneButton';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import "./DropButton.css"

function DropButton(props) {

    const [droppedButton, setButtonDropped] = useState(false)

    const DropButton = () => {
        setButtonDropped(!droppedButton)
    }

    return(

        <>
            {props.sidebarOpen ? (

                    <div className={droppedButton? "drop-btn-cont dropped" : "drop-btn-cont"} onClick={DropButton}>

                    <div className='drop-btn'>

                        <h2>{props.button}</h2>
                        <KeyboardArrowRightIcon className={droppedButton ? "drop-btn-arrow dropped" : "drop-btn-arrow"} />

                    </div>

                    {droppedButton ? (
                            <div className='drop-btn-buttons-cont'>

                                <ZoneButton 
                                    zoneButton="Zona 1"
                                />

                                <ZoneButton 
                                    zoneButton="Zona 2"
                                />

                            </div>
                        )
                        : 
                        null
                    }

                    </div>

                )
                :
                null
            }
        </>

        
    );
}

export default DropButton; 