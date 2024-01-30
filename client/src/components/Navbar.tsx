import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartFlatbed, faUserLarge, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SideMenu from './SideMenu';
import BarsIcon from "../assets/BarsIcon";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { logOut } from "../state/store/slice/sessionSlice";

const LoginArea = ({ sessionStatus, Logout }: { sessionStatus: RootState['session'], Logout: () => (void)}) => {
    if (!sessionStatus.signedIn) {
        return <>
            <span className="text-sm">Iniciar Sesión</span>
            <FontAwesomeIcon icon={faUserLarge} className="ml-1 fa-bounce" style={{ animationIterationCount: '4' }} />
        </>
    } else {
        return <>
            <label className="text-sm mr-1 capitalize">{sessionStatus.user.user_name}</label>
            <FontAwesomeIcon icon={faUserLarge} className="mr-2 fa-bounce" style={{ animationIterationCount: '4' }} />
            <FontAwesomeIcon icon={faRightFromBracket} onClick={Logout} />
        </>
    }
};

export default function Navbar() {

    // State
    const sessionState = useSelector((state: RootState) => state.session);
    const [sideMenuActive, setSideMenuActive] = useState(false);
    const [loginFormActive, setLoginFormActive] = useState(false);
    const dispatch = useDispatch();

    // Functions
    function toggleSideMenu() {
        setSideMenuActive(!sideMenuActive);
    }

    function toggleLoginForm() {
        setLoginFormActive(!loginFormActive);
        return null;
    }
    
    // Render
    return (
        <div>
            <SideMenu isActive={sideMenuActive} onXclick={() => toggleSideMenu()} />
            <Login isActive={loginFormActive} onXclick={() => toggleLoginForm()} />

            <div className="bg-gradient-to-b from-stone-700 to-black whitespace-nowrap overflow-visible z-10">

                <nav className="grid grid-cols-5 text-white h-12 items-center p-4">
                    <div className="flex col-span-2 text-left items-center">

                        <div onClick={toggleSideMenu}><BarsIcon /></div>

                        <Link to="/">
                            <span className="font-bold ml-1">⌚️Watch</span>
                            <span className="font-light">Store</span>
                        </Link>
                    </div>

                    <div className="col-span-1 items-center text-center">
                        <span className="seconds"></span>
                        <span className="absolute font-extralight text-4xs z-0 mt-4 -ml-3">EST '24</span>
                    </div>

                    <div className="flex justify-end col-span-2">
                        <div onClick={toggleLoginForm}><LoginArea sessionStatus={sessionState} Logout={() => dispatch(logOut())}/></div>
                    </div>
                </nav>

                <div className="flex items-center space-x-1 p-4">
                    <input className="w-full min-h-10 border-gray-500 rounded pl-2" id="searchBar" type="text" placeholder="Buscar"></input>
                    <div className="bg-lume-100 text-center p-2 rounded shadow-[inset_0px_0px_5px_-1px_rgba(0,0,0)]">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>

                <nav className="flex h-8 bg-stone-700 text-white text-sm items-center p-4">
                    <div className="flex flex-grow overflow-scroll">
                        {/* Load image in assets/images dislay it with an htmnl tag */}

                        <a className="">Provincia: San Jose</a>
                    </div>
                </nav>

            </div>
        </div>
    );
}

// Styles