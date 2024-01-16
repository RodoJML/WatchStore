import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings, type ListingItem } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";
import { faExpand, faGear, faGem} from "@fortawesome/free-solid-svg-icons";
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