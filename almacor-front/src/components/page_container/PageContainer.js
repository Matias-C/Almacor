import Navbar from "../navbar/Navbar";

import "./PageContainer.css"

function PageContainer({children}) {

    return(
      
      <>

        <div className="page-cont">

            <Navbar />

            {children}

        </div>

      </>

    );
}

export default PageContainer;