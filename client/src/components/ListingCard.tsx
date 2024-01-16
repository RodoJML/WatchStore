import { faExpand, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListingCard() {


    return (
        <div className="shadow-2xl shadow-black m-2 relative">
                
                <div className="ribbon"><span>Original</span></div>

                <div className="border border-white rounded-t border-opacity-30 border-b-0">
                    <img className="aspect-square border-4 rounded-t border-green-900 border-b-0 border-opacity-40 drop-shadow-2xl-white"
                        src="https://i0.wp.com/www.thetimebum.com/wp-content/uploads/2023/08/IMG_0611.jpeg?fit=1800%2C1800&ssl=1" />
                </div>

                <div className="bg-stone-900 rounded-b aspect-video text-center whitespace-nowrap border-t border-opacity-40 border-white">
                    <div className="grid col-span-1 p-1">

                        <div className="-mb-1 overflow-scroll">
                            <a className="text-white uppercase font-extrabold font-serif text-4vw">panerai</a>
                        </div>

                        <div className="grid">
                            <a className="text-white font-thin capitalize text-4vw -mb-1 overflow-scroll">luminor marina</a>

                            <div className="grid grid-cols-5 items-center text-white overflow-scroll">
                                <div className="col-span-1"></div>
                                <div className="col-span-3 text-left overflow-visible">
                                    <span className="text-2.5vw">₡</span><span className="text-4vw font-extrabold text-lume-100">100.000</span>
                                    <span className="text-2.5vw ml-1 text-white text-opacity-50">($200)</span>
                                </div>
                                    
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-white items-center text-3vw">
                            <div className="flex ml-3 items-center overflow-scroll">
                                <FontAwesomeIcon icon={faGear} className="fa-spin"/><span className="ml-1">Automatico</span>
                            </div>
                            
                            
                            <div className="flex mr-3 items-center overflow-scroll justify-end">
                            <span className="mr-1">44mm</span><FontAwesomeIcon icon={faExpand}/>
                            </div>
                        </div>


                    </div>
                </div>
               
            </div>
    )
}