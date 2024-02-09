import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserLarge, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SideMenu from './SideMenu';
import BarsIcon from "../assets/BarsIcon";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { apiFetch, logOut } from "../state/store/slice/sessionSlice";
import { StyleItem, provinces } from "../model/fetch";

const LoginArea = ({ sessionStatus, Logout }: { sessionStatus: RootState['session'], Logout: () => (void) }) => {
    if (!sessionStatus.signedIn) {
        return <div className="cursor-pointer">
            <span className="text-sm">Iniciar Sesión</span>
            <FontAwesomeIcon icon={faUserLarge} className="ml-1 fa-bounce" style={{ animationIterationCount: '5' }} />
        </div>
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
    const [watchStyles, setWatchStyles] = useState([] as StyleItem[]);
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Functions
    function toggleSideMenu() {
        setSideMenuActive(!sideMenuActive);
    }

    function toggleLoginForm() {
        setLoginFormActive(!loginFormActive);
        return null;
    }

    useEffect(() => {
        dispatch(apiFetch({ url: 'style' })).then((res) => {
            if (res.payload) {
                setWatchStyles(res.payload.data);
            }
        });
    }, []);

    // Render
    return (
        <div className="w-full h-40">
            <SideMenu isActive={sideMenuActive} onXclick={() => toggleSideMenu()} />
            <Login isActive={loginFormActive} onXclick={() => toggleLoginForm()} />

            <div className={`absolute bg-gradient-to-b from-stone-700 to-black whitespace-nowrap overflow-visible z-20 transition-all ease-in-out duration-500 px-4 pt-1 w-full ${advancedSearch ? 'h-96' : 'h-40'}`}>
                <nav className="grid grid-cols-5 text-white h-12 items-center">
                    <div className="flex col-span-2 text-left items-center">

                        <div className="cursor-pointer" onClick={toggleSideMenu}><BarsIcon /></div>

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
                        <div onClick={toggleLoginForm}><LoginArea sessionStatus={sessionState} Logout={() => dispatch(logOut())} /></div>
                        {/* <div className="w-5"><img src="./src/assets/images/crcflag.png" alt="" /></div> */}
                    </div>
                </nav>

                <div className="grid mt-3">
                    <div className="flex items-center space-x-1">
                        <input className="w-full min-h-10 border-gray-500 rounded pl-2" id="searchBar" type="text" placeholder="Buscar"></input>
                        <div className="bg-lume-100 text-center p-2 h-full rounded shadow-[inset_0px_0px_5px_-1px_rgba(0,0,0)]">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>

                    <div className="text-white text-2xs text-opacity-30 text-right mt-1 underline cursor-pointer" 
                    onClick={() => setAdvancedSearch(!advancedSearch)}>Busqueda avanzada</div>
                </div>

                <nav className="absolute -ml-4 w-full bottom-0 flex h-8 bg-stone-700 text-white text-sm items-center">
                    <img className="p-2 max-w-full max-h-full object-contain" src="/src/assets/images/crc.png" />

                    <select className="bg-stone-700 focus:outline-none max-w-full -ml-2 cursor-pointer">
                        <option key="CRC">Todo</option>
                        {provinces.map((province) => {
                            return <option key={province}>{province}</option>
                        })}
                    </select>

                    {false
                        ? <div className="flex flex-grow overflow-scroll animate-pulse mx-3">
                            <div>⏳ El presente es el regalo del tiempo ...</div>
                        </div>
                        : <div className="flex flex-grow overflow-scroll scroll-smooth justify-between">
                            {watchStyles.map((style) => {
                                return <Link key={style.style_id} to={""} className="mx-3">{style.style_name}</Link>
                            })}
                        </div>}
                </nav>
            </div>

            {advancedSearch && <div className="fixed bg-transparent transition-all ease-in-out duration-1000 backdrop-blur w-full h-screen left-0 z-10"></div>}
            
        </div>
    );
}

const NavBarStyleSearchOFF = "relative bg-gradient-to-b from-stone-700 to-black whitespace-nowrap overflow-visible z-10 transition-all ease-in-out duration-500 px-4 pt-1 h-40";
const NavBarStyleSearchON = "relative bg-gradient-to-b from-stone-700 to-black whitespace-nowrap overflow-visible z-10 transition-all ease-in-out duration-500 px-4 pt-1 h-96";