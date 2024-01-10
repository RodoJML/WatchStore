import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SideMenu from './SideMenu';
import { Link } from "react-router-dom";

// Components
function SideBarIcon({ toggle }: { toggle: boolean; }) {
    if (toggle) {
        return <a className="p-0 m-0">
                <div className="bg-lume-100 w-5 h-1 rounded mr-1 mb-1"></div>
                <div className="bg-lume-100 w-5 h-1 rounded mr-1 mb-1"></div>
                <div className="bg-lume-100 w-5 h-1 rounded mr-1"></div>
            </a>
    } else {
        return <a className="p-0 m-0">
        <div className="bg-lume-100 w-5 h-1 rounded mr-1 mb-1"></div>
        <div className="bg-lume-100 w-5 h-1 rounded mr-1 mb-1"></div>
        <div className="bg-lume-100 w-5 h-1 rounded mr-1"></div>
    </a>
    }
}


export default function Navbar() {

    // State
    const [sideMenuActive, setSideMenuActive] = useState(false);

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
                    <input className="w-full min-h-10 border-gray-500 rounded" type="text" placeholder=" Buscar"></input>
                    <div className="bg-lume-100 text-center p-2 rounded shadow-[inset_0px_0px_5px_-1px_rgba(0,0,0)]">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>

                <nav className="flex h-8 bg-stone-700 text-white text-sm items-center p-4">
                    <div className="flex flex-grow overflow-scroll">
                        {/* Load image in assets/images dislay it with an htmnl tag */}

                        <img className="h-5" src='/src/assets/images/crc.png' alt="Logo" />
                        <a className="">Provincia: San Jose</a>
                    </div>
                </nav>


            </div>



        </>
    );
}

// Styles