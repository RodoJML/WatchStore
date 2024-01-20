import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, DataEnvelope } from "../model/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


function ListingListLoading() {
    return (
        <>
            <div className={`${listingListStyle}` + "animate-pulse"}>
                <div className="flex h-screen justify-center p-28">
                    <div className="h-10 animate-ping">
                        <img className="h-10 rounded-full animate-spin"
                            src="/src/assets/images/loading.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}


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
        <div className="m-4">
            <ListingListLoading />
        </div>

    )
}

const listingListStyle = "bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black "
const listingGridStyle = "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8" // gap tbd
