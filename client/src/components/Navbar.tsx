import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
// wishlist icon
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {
    return (
        <>
            <div className="bg-gradient-to-b from-stone-700 to-stone-900">
                <nav className="grid grid-cols-5 text-white min-h-14 items-center p-4">
                    <div className="col-span-2 text-left">
                        <FontAwesomeIcon icon={faBars} />
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