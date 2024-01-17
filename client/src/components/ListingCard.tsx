import { faExpand, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StockItem, ListingItem } from "../model/fetch";

export default function ListingCard() {


    return (
        <div className="shadow-2xl shadow-black m-2 relative">
                
                <div className="ribbon"><span>Original</span></div>

                <div className="border border-white rounded-t border-opacity-30 border-b-0">
                    {/* <div className="bg-green-950 opacity-40 aspect-square"></div>  For when api is loading */}
                    <img className="aspect-square border-4 rounded-t border-green-900 border-b-0 border-opacity-40 drop-shadow-2xl-white"
                        src="https://i0.wp.com/www.thetimebum.com/wp-content/uploads/2023/08/IMG_0611.jpeg?fit=1800%2C1800&ssl=1" />
                </div>

                <div className="grid bg-stone-900 rounded-b aspect-video text-center whitespace-nowrap border-t border-opacity-40 border-white items-center p-2">
                    <div className="grid col-span-1 p-1">

                        <div className="-mb-1 overflow-scroll">
                            <a className="text-white uppercase font-extrabold font-serif text-4vw sm:text-lg">panerai</a>
                        </div>

                        <div className="grid">
                            <a className="text-white font-thin capitalize text-4vw sm:text-lg -mb-1 overflow-scroll">luminor marina</a>

                            <div className="flex text-white overflow-scroll justify-center items-center">
                                    <span className="text-3vw sm:text-xs">₡</span><span className="text-4vw sm:text-lg font-extrabold text-lume-100">100.000</span>
                                    <span className="text-3vw sm:text-xs ml-1 text-white text-opacity-50">($200)</span>                                    
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-white text-3vw sm:text-xs mt-2">
                            <div className="items-center overflow-visible text-left">
                                <FontAwesomeIcon icon={faGear} className="fa-spin"/>
                                <span className="ml-1">Automatico</span>
                            </div>

                            <div className="items-center overflow-visible text-right">
                                <FontAwesomeIcon icon={faExpand}/>
                                <span className="ml-1">44mm</span>
                            </div>
                        </div>


                    </div>
                </div>
               
            </div>
    )
}