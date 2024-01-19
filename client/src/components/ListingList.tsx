import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListingCard from "./ListingCard";
import { faCalendarDays, faEye, faStar } from "@fortawesome/free-solid-svg-icons";

export default function ListingList() {


    return (
        <>
            <div className="relative bg-wooden-pattern bg-2xl rounded-lg p-2 shadow shadow-black mb-4 h-40">
                <div className="ribbon"><span>Original</span></div>

                <div className="flex bg-amber-50 w-full h-full p-2 rounded shadow shadow-black border border-stone-800">

                    <div className="absolute bottom-5 left-6 text-xs text-white opacity-50">
                        <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#ffffff", opacity: 0.7 }} />
                        <i> 7 dias</i>
                    </div>

                    <div>
                        <div className="absolute bottom-5 left-24 text-xs text-white opacity-50 z-10">
                            <FontAwesomeIcon icon={faEye} style={{ color: "#ffffff", opacity: 0.7 }} />
                            <i> 347</i>
                        </div>
                    </div>

                    <img className="aspect-square h-full object-cover rounded shadow shadow-black mr-4"
                        src="https://www.watchesandcrystals.com/cdn/shop/articles/mens-gucci-watches-for-sale-that-is-worth-it-562855.jpg?v=1659676055" />

                    <div className="grid">
                        <div className="block overflow-hidden">
                            <div className="text-amber-900 opacity-60 font-serif font-extrabold text-lg uppercase whitespace-nowrap overflow-scroll -mb-2 -mt-1">AUDEMARS PIGET</div>
                            <div className="text-md text-amber-950 font-light capitalize -mb-1">luminor</div>

                            <div className="align-middle">
                                <span className="text-xs">₡</span>
                                <span className="text-lg text-stone-700 font-extrabold">100.000</span>
                                <span className="text-xs ml-1 text-stone-700">$200</span>
                            </div>

                            <div className="grid grid-cols-2 text-2xs text-stone-700">
                                <div className="font-bold">Movimiento:</div>
                                <div>Automatico</div>
                                <div className="font-bold">Condicion:</div>
                                <div>Usado</div>
                                <div className="font-bold">Garantia:</div>
                                <div>3 meses</div>
                                <div className="font-bold">Tamaño:</div>
                                <div>44mm</div>
                            </div>

                        </div>
                    </div>


                    <div className="invisible w-0 h-0 sm:w-40 sm:h-full sm:visible ml-auto mt-6 mr-4 text-stone-800 text-xs">
                        <div className="invisible sm:visible grid grid-cols-2">
                            <div>Rating:</div>
                            <span>
                                <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0s' }} />
                                <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.06s' }} />
                                <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.12s' }} />
                                <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.18s' }} />
                                <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.24s' }} />
                            </span>
                            <div>Tienda:</div>
                            <div>My Store</div>
                            <div>Cantidad:</div>
                            <div>1</div>
                            <div>Ubicación:</div>
                            <div>San Jose</div>
                            <div>Vendedor: </div>
                            <div>John Doe</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

//w-full h-48 for the white piece

