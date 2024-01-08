import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";


export default function Navbar() {
    return (
        <>
            <div className="backdrop-blur bg-gray-900">
                <nav className="grid grid-cols-5 text-white min-h-14 items-center p-4">
                    <div className="col-span-2 text-left">
                        <label>WatchStore</label>
                        <FontAwesomeIcon icon={faBars} />
                    </div>

                    <div className="col-span-1 text-center">
                        <time/>
                    </div>

                    <div className="col-span-2 text-right">
                        Wishlist
                    </div>
                </nav>
                
                <div className="p-4 flex items-center space-x-1">                
                    <input className="w-full min-h-10 border-gray-500 rounded" type="text" placeholder="Buscar..."></input>
                    <div className="bg-green-300 text-center p-2 rounded">
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
                


            </div>


            
        </>
    );
}

// Styles