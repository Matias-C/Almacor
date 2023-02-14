import TextField from '@mui/material/TextField';

import "./AddPage.css"

function AddPage() {
    return(

        <>
            <div className='add-page-header'>

                <h1>Ubicar Pallet</h1>

            </div>

            <div className='add-page-cont'>

                <div className='add-page-content'>

                    <h2>Ingrese el código del pallet</h2>

                    <hr className='separator' />

                    <TextField className='add-page-input' label="Código" variant="standard" />

                    <button className='add-page-button'><h2>Añadir</h2></button>

                </div>

            </div>

        </>
        

    );
}

export default AddPage;