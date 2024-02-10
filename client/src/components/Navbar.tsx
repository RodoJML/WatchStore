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
import bellsAudio from "../assets/audio/Bells.mp3";

const LoginArea = ({ sessionStatus, Logout }: { sessionStatus: RootState['session'], Logout: () => (void) }) => {
    if (!sessionStatus.signedIn) {
        return <div className="cursor-pointer">
            <span className="text-sm">Iniciar Sesión</span>
            <FontAwesomeIcon icon={faUserLarge} className="ml-1 fa-bounce" style={{ animationIterationCount: '10' }} />
        </div>
    } else {
        return <>
            <label className="text-sm mr-1 capitalize">{sessionStatus.user.user_name}</label>
            <FontAwesomeIcon icon={faUserLarge} className="mr-2"/>
            <FontAwesomeIcon className="cursor-pointer" icon={faRightFromBracket} onClick={Logout} />
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
    const [advancedSearchOptions, setAdvancedSearchOptions] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const playSound = () => {
        const audio = new Audio(bellsAudio);
        audio.play();
    }

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

    useEffect(() => {
        if (sessionState.signedIn) {
            playSound();
        }
    }, [sessionState.signedIn]);

    // Render
    return (
        <div className="w-full h-41">

            <SideMenu isActive={sideMenuActive} onXclick={() => toggleSideMenu()} />
            <Login isActive={loginFormActive} onXclick={() => toggleLoginForm()} />

            <div className={`absolute bg-gradient-to-b from-stone-700 to-black whitespace-nowrap overflow-visible z-20 transition-all ease-in-out duration-500 px-4 pt-1 w-full ${advancedSearch ? 'h-100' : 'h-41'}`}>
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

                    <div className="text-white text-2xs text-opacity-30 text-right mt-1 mb-1 underline cursor-pointer"
                        onClick={() => {
                            setAdvancedSearch(!advancedSearch)
                            if (!advancedSearch) {
                                setTimeout(() => { setAdvancedSearchOptions(!advancedSearchOptions) }, 200);
                            } else {
                                setAdvancedSearchOptions(!advancedSearchOptions)
                            }
                        }}>Busqueda avanzada</div>

                    {advancedSearchOptions && <div className="grid grid-cols-2 gap-2 text-sm text-white mt-1">

                        <div className="grid grid-cols-2 gap-2">

                            <div>
                                <div>Tipo</div>
                                <div>Peso</div>
                                <div>Estilo</div>
                                <div>Forma</div>
                                <div>Cristal</div>
                                <div>Grosor</div>
                                <div>Genero</div>
                                <div>Tamaño</div>
                                <div>Movimiento</div>
                                <div>WaterProof</div>
                                <div>WaterResist</div>

                            </div>

                            <div className="grid text-lume-100">
                                <select className="bg-transparent" name="Luminiscencia" id="">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">

                            <div>
                                <div>Bisel</div>
                                <div>C:Dial</div>
                                <div>Hebilla</div>
                                <div>Reserva</div>
                                <div>M: Bisel</div>
                                <div>M:Cristal</div>
                                <div>C: Correa</div>
                                <div>M: Correa</div>
                                <div>C: Carcasa</div>
                                <div>M: Carcasa</div>
                                <div>Luminiscen</div>
                            </div>

                            <div className="grid text-lume-100">
                                <select className="bg-transparent" name="Luminiscencia" id="">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                                <select className="bg-transparent" name="Luminiscencia">
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                            </div>

                        </div>

                    </div>}


                </div>

                <nav className="absolute -ml-4 w-full bottom-0 flex h-8 bg-stone-700 text-white text-sm items-center">
                    <img className="p-2 max-w-full max-h-full object-contain" src="/src/assets/images/crc.png" />

                    <select className="bg-stone-700 focus:outline-none max-w-full -ml-2 cursor-pointer" name="province" id="province">
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

            <div className={`fixed bg-transparent transition-all ease-in-out duration-1000 backdrop-blur w-full h-full left-0 z-10 ${advancedSearch ? 'top-0 h-screen' : '-top-full'}`}></div>

        </div>
    );
}