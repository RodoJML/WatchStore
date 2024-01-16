import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings, type ListingItem } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";
import { faExpand, faGear, faRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Listing() {

    const listingsState = useSelector((state: RootState) => state.listings);
    const dispatch = useDispatch<AppDispatch>();

    const [listings, setData] = useState<DataEnvelopeList<ListingItem>>();

    useEffect(() => {
        dispatch(getAllListings()).then((res) => {
            setData(res.payload as DataEnvelopeList<ListingItem>)
        })
    }, []);

    return (
        <div className="flex">

            <div className="shadow-2xl shadow-black m-2">

                <div className="border border-white rounded-t border-opacity-30 border-b-0">
                    <img className="aspect-square border-4 rounded-t border-green-900 border-b-0 border-opacity-40 drop-shadow-2xl-white"
                        src="https://i0.wp.com/www.thetimebum.com/wp-content/uploads/2023/08/IMG_0611.jpeg?fit=1800%2C1800&ssl=1" />
                </div>

                <div className="bg-stone-900 rounded-b aspect-video text-center whitespace-nowrap border-t border-opacity-40 border-white">
                    <div className="grid col-span-1 p-1">

                        <div className="-mb-1 overflow-scroll">
                            <a className="text-white font-extrabold font-serif text-4vw">PANERAI</a>
                        </div>

                        <div className="grid">
                            <a className="text-white font-thin text-4vw -mb-1 overflow-scroll">Luminor Marina</a>

                            <div className="flex justify-center items-center text-white">
                                    <a className="text-4vw">₡100.000</a><span>|</span>
                                    <a className="text-3vw text-opacity-80">$200</a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-white items-center text-3vw">
                            <div className="flex ml-4 items-center">
                                <FontAwesomeIcon icon={faGear} className="fa-spin"/><span className="ml-1">Automatico</span>
                            </div>
                            
                            
                            <div className="flex ml-4 items-center">
                                <FontAwesomeIcon icon={faExpand}/><span className="ml-1">44mm</span>
                            </div>
                            
                        </div>


                    </div>
                </div>
            </div>

            <div className="shadow-2xl shadow-black m-2">

                <div className="border border-white rounded-t border-opacity-30 border-b-0">
                    <img className="aspect-square border-4 rounded-t border-green-900 border-b-0 border-opacity-40 drop-shadow-2xl-white"
                        src="https://i0.wp.com/www.thetimebum.com/wp-content/uploads/2023/08/IMG_0611.jpeg?fit=1800%2C1800&ssl=1" />
                </div>

                <div className="bg-stone-900 rounded-b aspect-video text-center overflow-hidden object-scale-down">
                    <div className="grid col-span-1 p-2">

                        <div>
                            <a className="text-white font-extrabold font-serif text-4vw">PANERAI</a>
                        </div>

                        <div>
                            <a className="text-white font-light text-4vw">Luminor Marina</a>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}