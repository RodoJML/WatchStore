import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartFlatbed } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getStyles, type Style } from "../model/styles";
import SideMenu from './SideMenu';
import BarsIcon from "../assets/barsIcon";

// Functions

function SideBarIcon({ toggle }: { toggle: boolean; }) {
    if (toggle) {
        return <BarsIcon />
    } else {
        return <BarsIcon />
    }
}


export default function Navbar() {

    // State
    const [styles, setStyles] = useState<Style[]>([]);
    const [sideMenuActive, setSideMenuActive] = useState(false);
    getStyles().then((styles) => setStyles(styles.data));

    // Functions
    function toggleSideMenu() {
        setSideMenuActive(!sideMenuActive);
    }

    // Render
    return (
        <>
            <div className="bg-gradient-to-b from-stone-700 to-stone-900">

                <SideMenu isActive={sideMenuActive} onXclick={() => toggleSideMenu()} />

                <nav className="grid grid-cols-5 text-white h-12 items-center p-4">
                    <div className="flex col-span-2 text-left items-center">

                        <div onClick={toggleSideMenu}><SideBarIcon toggle={sideMenuActive} /></div>

                        <Link to="/">
                            <span className="font-bold ml-1">⌚️Tico</span>
                            <span className="font-light">Toc</span>
                        </Link>
                    </div>

                    <div className="col-span-1 items-center text-center">
                        <span className="seconds"></span>
                        <span className="absolute font-extralight text-4xs z-0 mt-4 -ml-3">EST '24</span>
                    </div>

                    <div className="flex justify-end col-span-2">
                        <FontAwesomeIcon icon={faCartFlatbed} />
                    </div>
                </nav>

                <div className="flex items-center space-x-1 p-4">
                    <input className="w-full min-h-10 border-gray-500 rounded" id="searchBar" type="text" placeholder=" Buscar"></input>
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



        </>
    );
}

// Styles