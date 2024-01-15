import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings, type ListingItem } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";

export default function Listings() {

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
            {listingsState.isLoading && <div>Loading...</div>}
            Listings
        </div>
    )
}