import TextField from '@mui/material/TextField';

import "./RemovePage.css"

function RemovePage() {
    return(

        <>
            <div className='remove-page-header'>

                <h1>Remover Pallet</h1>

            </div>

            <div className='remove-page-cont'>

                <div className='remove-page-content'>

                    <h2>Ingrese el código del pallet</h2>

                    <hr className='separator' />

                    <TextField className='remove-page-input' label="Código" variant="standard" />

                    <button className='remove-page-button'><h2>Remover</h2></button>

                </div>

            </div>

        </>
        

    );
}

export default RemovePage;