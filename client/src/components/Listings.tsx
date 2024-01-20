import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";
import ListingList from "./ListingList";
import ListingList1 from "./ListingList1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


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
        <div>
            <FontAwesomeIcon icon={faSpinner} className="absolute fa-spin text-white text-3xl text-center z-20" />
            <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black m-3 animate-pulse">
                <div className="h-screen"></div>
            </div>
        </div>
        
    )
}

// This is for grid view of watches, Listings columns responsiveness properties
// grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8
// set a column gap...

// This is for the list view of the watches 
// bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black