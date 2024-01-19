import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";
import ListingList from "./ListingList";
import ListingList1 from "./ListingList1";


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
        <div className="bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black m-3">        
            <ListingList />
            <ListingList />
            <ListingList />
            <ListingList />
            <ListingList />


        </div>
    )
}

// This is for grid view of watches, Listings columns responsiveness properties
// grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8
// set a column gap...

// This is for the list view of the watches 
// bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black