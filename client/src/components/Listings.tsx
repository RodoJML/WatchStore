import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings, type ListingItem } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";

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
        <div className="bg-gray-500">
            {listingsState.isLoading && <div>Loading...</div>}

            <div className="m-24">
                <div className="bg-green-950 aspect-square border-4 rounded-t border-white border-b border-opacity-60 drop-shadow-2xl-white">
                    <span className="text-white">Listings</span>
                </div>
                <div className="bg-stone-900 border-b aspect-video text-center overflow-hidden">
                    <div className="grid p-2">
                        <a className="text-white font-bold whitespace-nowrap">PANERAI</a>
                        <a className="text-white font-light whitespace-nowrap">Model of the Watch</a>
                        <span>🇰🇷</span>
                        <span className="text-white" >AAA</span>
                        <span className="text-white" >AAA</span>
                    </div>
                </div>
            </div>

            <div>
                TESTING
            </div>
        </div>
    )
}