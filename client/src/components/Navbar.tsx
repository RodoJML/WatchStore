import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

// Dont forget to add stiching to the design



export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function Menu({ isMenuOpen }) {
        return isMenuOpen ? (
            <div className="bg-white w-40 h-full absolute transition ease-in delay-1000 duration-1000"> My Flyout </div>
        ) : null;
    }
    
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <div className="bg-gradient-to-b from-stone-700 to-stone-900">

                <Menu isMenuOpen={isMenuOpen} />

                <nav className="grid grid-cols-5 text-white min-h-14 items-center p-4">
                    <div className="col-span-2 text-left">
                        <FontAwesomeIcon icon={faBars} onClick={toggleMenu}/>
                        <span className="font-bold"> &nbsp; Watch</span><span className="font-light">Store</span>
                    </div>

                    <div className="col-span-1 items-center text-center">
                        <span className="seconds"></span>
                    </div>

                    <div className="col-span-2 text-right">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </nav>

                <div className="p-4 flex items-center space-x-1">
                    <input className="w-full min-h-10 border-gray-500 rounded" type="text" placeholder="Buscar..."></input>
                    <div className="bg-lume-100 text-center p-2 rounded shadow-[inset_0px_0px_5px_-1px_rgba(0,0,0)]">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>



            </div>



        </>
    );
}

// Styles