import Navbar from "../navbar/Navbar";

import "./AppContainer.css";

function AppContainer({ children }) {
    return (
        <>
            <div className="page-cont">
                <Navbar />

                {children}
            </div>
        </>
    );
}

export default AppContainer;
