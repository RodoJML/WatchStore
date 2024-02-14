import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserLarge, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SideMenu from './SideMenu';
import BarsIcon from "../assets/BarsIcon";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { apiFetch, logOut, setNotification } from "../state/store/slice/sessionSlice";
import { SearchForm } from "../model/fetch";
import bellsAudio from "../assets/audio/Bells.mp3";
import { search, searchModeOn, setLastSearch } from "../state/store/slice/listingsSlice";


const LoginArea = ({ sessionStatus, Logout }: { sessionStatus: RootState['session'], Logout: () => (void) }) => {
    if (!sessionStatus.signedIn) {
        return <div className="cursor-pointer">
            <span className="text-sm">Iniciar Sesión</span>
            <FontAwesomeIcon icon={faUserLarge} className="ml-1 fa-bounce" style={{ animationIterationCount: '10' }} />
        </div>
    } else {
        return <>
            <label className="text-sm mr-1 capitalize">{sessionStatus.user.user_name}</label>
            <FontAwesomeIcon icon={faUserLarge} className="mr-2" />
            <a href="/" onClick={Logout}>
                <FontAwesomeIcon className="cursor-pointer" icon={faRightFromBracket} />
            </a>
        </>
    }
};

export default function Navbar() {

    // State
    const sessionState = useSelector((state: RootState) => state.session);
    const listingState = useSelector((state: RootState) => state.listings);
    const [sideMenuActive, setSideMenuActive] = useState(false);
    const [loginFormActive, setLoginFormActive] = useState(false);
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [advancedSearchOptions, setAdvancedSearchOptions] = useState(false);
    const [advancedSearchParameters, setadvancedSearchParameters] = useState({} as SearchForm);
    const [normalSearchParameters, setnormalSearchParameters] = useState("");
    const dispatch = useDispatch<AppDispatch>();


    // The next two functions handle the form submission and changes on the input fields
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (advancedSearch) {
            console.log("form submitted: ", advancedSearchParameters);

        } else {
            if (normalSearchParameters === "") {
                dispatch(setNotification({ message: "Por favor ingrese un término de búsqueda", type: "warning" }));
            } else {
                dispatch(search({query: normalSearchParameters, page:1}));
                dispatch(setLastSearch(normalSearchParameters));
            }
            console.log("form submitted: ", normalSearchParameters);
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // name is the name of the input field
        // value is the value of the input field
        const { name, value } = e.target;
        setadvancedSearchParameters({ ...advancedSearchParameters, [name]: value });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(e.target.id === 'model'){setadvancedSearchParameters({ ...advancedSearchParameters, [name]: value });}
        if(e.target.id === 'searchBar'){setnormalSearchParameters(value);}
    }

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
        dispatch(apiFetch({ url: 'brand' }));
        dispatch(apiFetch({ url: 'style' }));
        dispatch(apiFetch({ url: 'type' }));
        dispatch(apiFetch({ url: 'movement' }));
        dispatch(apiFetch({ url: 'shape' }));
        dispatch(apiFetch({ url: 'case_material' }));
        dispatch(apiFetch({ url: 'glass_material' }));
        dispatch(apiFetch({ url: 'strap_material' }));
        dispatch(apiFetch({ url: 'bezel_type' }));
        dispatch(apiFetch({ url: 'bezel_material' }));
        dispatch(apiFetch({ url: 'clasp_type' }));
        dispatch(apiFetch({ url: 'provinces' }));
        dispatch(apiFetch({ url: 'colors' }));
        dispatch(apiFetch({ url: 'sizes' }));
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

            <div className={`absolute bg-gradient-to-b from-stone-700 to-black whitespace-nowrap overflow-visible z-20 transition-all ease-in-out duration-500 px-4 pt-1 w-full ${advancedSearch ? 'h-107' : 'h-41'}`}>
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

                <form onSubmit={handleSubmit}>
                    <div className="grid mt-3">
                        <div className="flex items-center space-x-1">
                            <input className="w-full min-h-10 border-gray-500 rounded px-2"
                                id={advancedSearch ? 'model' : 'searchBar'}
                                name={advancedSearch ? 'model' : 'searchBar'}
                                type="search"
                                placeholder={advancedSearch ? 'Modelo' : 'Buscar'}
                                onChange={handleInputChange}></input>
                            <button type="submit" className="bg-lume-100 text-center p-2 h-full rounded shadow-[inset_0px_0px_5px_-1px_rgba(0,0,0)]" 
                            onClick={() => {dispatch(searchModeOn())}}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>

                        <div className="text-white text-2xs text-opacity-30 text-right mt-1 underline cursor-pointer"
                            onClick={() => {
                                setAdvancedSearch(!advancedSearch)
                                if (!advancedSearch) {
                                    setadvancedSearchParameters({ ...advancedSearchParameters, model: normalSearchParameters});
                                    setTimeout(() => { setAdvancedSearchOptions(!advancedSearchOptions) }, 200);
                                } else {
                                    setAdvancedSearchOptions(!advancedSearchOptions)
                                    setnormalSearchParameters(advancedSearchParameters.model ?? '');
                                }
                            }}>
                            Busqueda avanzada
                        </div>


                        {advancedSearchOptions &&
                            <div className="grid grid-cols-2 gap-2 text-sm text-white mt-1">

                                <div className="grid grid-cols-2 gap-2">

                                    <div className="overflow-hidden">
                                        <div>Marca</div>
                                        <div>Condición</div>
                                        <div>Certificación</div>
                                        <div>Movimiento</div>
                                        <div>Tamaño</div>
                                        <div>Estilo</div>
                                        <div>Tipo</div>
                                        <div>Bisel</div>
                                        <div>Cristal</div>
                                        <div>Forma</div>
                                        <div>Genero</div>
                                        <div>Provincia</div>
                                        <div>Luminiscen</div>
                                    </div>


                                    <div className="grid text-lume-100 overflow-hidden ">

                                        <select className="bg-transparent focus:outline-none" name="brand" id="brand" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.brands.map((brand) => {
                                                return <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="condition" id="condition" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="1" value="1">Nuevo</option>
                                            <option key="2" value="2">Usado</option>
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="certification" id="certification" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="1" value="1">Original</option>
                                            <option key="2" value="2">AAA</option>
                                            <option key="3" value="3">AA</option>
                                            <option key="4" value="4">A</option>
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="movement" id="movement" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.movements.map((movement) => {
                                                return <option key={movement.movement_id} value={movement.movement_id}>{movement.movement_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="width" id="width" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.sizes.map((size) => {
                                                return <option key={size} value={size}>{size}mm</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="style" id="style" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.styles.map((style) => {
                                                return <option key={style.style_id} value={style.style_id}>{style.style_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="type" id="type" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.types.map((type) => {
                                                return <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="bezel_type" id="bezel_type" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.bezels.map((bezel) => {
                                                return <option key={bezel.bezelType_id} value={bezel.bezelType_id}>{bezel.bezelType_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="glass_material" id="glass_material" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.glass_materials.map((glass_material) => {
                                                return <option key={glass_material.glass_id} value={glass_material.glass_id}>{glass_material.glass_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="shape" id="shape" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.shapes.map((shape) => {
                                                return <option key={shape.shape_id} value={shape.shape_id}>{shape.shape_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="gender" id="gender" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="1" value="male">Hombre</option>
                                            <option key="2" value="female">Mujer</option>
                                            <option key="3" value="unisex">Unisex</option>
                                        </select>


                                        <select className="bg-transparent focus:outline-none" name="province" id="province" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.provinces.map((province) => {
                                                return <option key={province} value={province}>{province}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="lume" id="lume" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option value="1">Si</option>
                                            <option value="0">No</option>
                                        </select>

                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">

                                    <div>
                                        <div>Peso</div>
                                        <div>Grosor</div>
                                        <div>Cierre</div>
                                        <div>Reserva</div>
                                        <div>Garantía</div>
                                        <div>W. Proof</div>
                                        <div>W. Resistant</div>
                                        <div>M: Carcasa</div>
                                        <div>M: Correa</div>
                                        <div>M: Bisel</div>
                                        <div>C: Carcasa</div>
                                        <div>C: Correa</div>
                                        <div>C: Dial</div>
                                    </div>

                                    <div className="grid text-lume-100 overflow-hidden">

                                        <select className="bg-transparent focus:outline-none" name="weight" id="weight" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="light" value="30">Liviano</option> {/* 30 - 100g*/}
                                            <option key="medium" value="100">Normal</option> {/* 100 - 150g*/}
                                            <option key="heavy" value="150">Pesado</option> {/* 150 - 200g*/}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="depth" id="depth" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="ultra_slim" value="ultra_slim">Ultra-slim</option> {/* 2-6mm */}
                                            <option key="slim" value="slim">Slim</option> {/* 6-9mm */}
                                            <option key="standard" value="standard">Standard</option> {/* 10 - 12mm */}
                                            <option key="thick" value="thick">Thick</option> {/* 13 - 15mm */}
                                            <option key="bulky" value="bulky">Bulky</option> {/* >15mm */}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="clasp_type" id="clasp_type" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.clasps.map((clasp) => {
                                                return <option key={clasp.claspType_id} value={clasp.claspType_id}>{clasp.claspType_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="power_reserve" id="power_reserve" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="24" value="24">24hr</option>
                                            <option key="48" value="48">48hr</option>
                                            <option key="72" value="72">72hr</option>
                                            <option key="96" value="96">96hr</option>
                                            <option key="120" value="120">120hr</option>
                                            <option key="148" value="120">148hr</option>
                                            <option key="172" value="120">172hr</option>
                                            <option key="196" value="120">96hr</option>
                                            <option key="999" value="999">Batería</option>
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="guarantee" id="guarantee" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="1" value="1">Sí</option>
                                            <option key="2" value="2">No</option>
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="water_proof" id="water_proof" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="1" value="1">Sí</option>
                                            <option key="2" value="2">No</option>
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="water_resistant" id="water_resistant" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            <option key="1" value="1">Sí</option>
                                            <option key="2" value="2">No</option>
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="case_material" id="case_material" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.case_materials.map((case_material) => {
                                                return <option key={case_material.caseMaterial_id}
                                                    value={case_material.caseMaterial_id}>
                                                    {case_material.caseMaterial_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="strap_material" id="strap_material" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.strap_materials.map((strap_material) => {
                                                return <option key={strap_material.strapMaterial_id}
                                                    value={strap_material.strapMaterial_id}>
                                                    {strap_material.strapMaterial_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="bezel_material" id="bezel_material" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.bezel_materials.map((bezel_material) => {
                                                return <option key={bezel_material.bezelMaterial_id}
                                                    value={bezel_material.bezelMaterial_id}>
                                                    {bezel_material.bezelMaterial_name}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="case_color" id="case_color" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.colors.map((color) => {
                                                return <option key={color} value={color}>{color}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="strap_color" id="strap_color" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.colors.map((color) => {
                                                return <option key={color} value={color}>{color}</option>
                                            })}
                                        </select>

                                        <select className="bg-transparent focus:outline-none" name="dial_color" id="dial_color" onChange={handleSelectChange}>
                                            <option key="all" value="all">Todos</option>
                                            {sessionState.colors.map((color) => {
                                                return <option key={color} value={color}>{color}</option>
                                            })}
                                        </select>

                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </form>


                {advancedSearch
                    ?
                    <i className="absolute left-0 w-full bottom-0 flex h-8 bg-stone-700 text-white text-xs items-center pl-4">
                        C: Color | M: Material | W: Water
                    </i>
                    :
                    <nav className="absolute left-0 w-full bottom-0 flex h-8 bg-stone-700 text-white text-sm items-center">
                        <img className="p-2 max-w-full max-h-full object-contain" src="/src/assets/images/crc.png" />

                        <select className="bg-stone-700 focus:outline-none max-w-full -ml-2 cursor-pointer" name="province" id="province">
                            <option key="CRC">Costa Rica</option>
                            {sessionState.provinces.map((province) => {
                                return <option key={province}>{province}</option>
                            })}
                        </select>

                        {sessionState.isLoading
                            ?
                            <div className="flex flex-grow overflow-scroll animate-pulse mx-3">
                                <div>⏳ El presente es el regalo del tiempo ...</div>
                            </div>
                            :
                            <div className="flex flex-grow overflow-scroll scroll-smooth justify-between">
                                {sessionState.styles.map((style) => {
                                    return <Link key={style.style_id} to={""} className="mx-3">{style.style_name}</Link>
                                })}
                            </div>
                        }
                    </nav>}


            </div>

            <div className={`fixed bg-transparent transition-all ease-in-out duration-1000 backdrop-blur w-full h-full left-0 z-10 ${advancedSearch ? 'top-0 h-screen' : '-top-full'}`}></div>

        </div>
    );
}