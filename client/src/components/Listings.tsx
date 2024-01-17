import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";
import ListingCard from "./ListingCard";


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
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            <ListingCard /> <ListingCard /> <ListingCard /> <ListingCard /> <ListingCard /> <ListingCard />
        

        </div>
    )
}