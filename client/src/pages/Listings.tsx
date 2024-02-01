import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { getAllListings } from "../state/store/slice/listingsSlice";
import type { DataEnvelopeList, ListingItem } from "../model/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faList } from "@fortawesome/free-solid-svg-icons";
import ListingCard from "../components/ListingCard";


// function ListingListLoading() {
//     return (
//         <>
//             <div className={`${listingListStyle}` + "animate-pulse"}>
//                 <div className="flex h-screen justify-center p-28">
//                     <img className="h-10 rounded-full animate-spin"
//                         src="/src/assets/images/loading.png" alt="" />
//                 </div>
//             </div>
//         </>
//     )
// }


export default function Listing() {

    const sessionState = useSelector((state: RootState) => state.session);
    const [condition, setCondition] = useState(1);
    const [viewMode, setViewMode] = useState(true);

    function watchCondition(condition: number) {
        // Condition 1: "todos", 2: "nuevos", 3: "usados"
        setCondition(condition);
    }

    function listingsViewMode() {
        // Mode true: "grid", false: "list"
        setViewMode(!viewMode);
    }

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
            <div className="flex justify-center m-3 text-xs">
                <div className="grid grid-cols-3 gap-4 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 mr-2 items-center font-bold">
                    <div className={condition === 1 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(1)}>Todos</div>
                    <div className={condition === 2 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(2)}>Nuevos</div>
                    <div className={condition === 3 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(3)}>Usados</div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 items-center cursor-pointer"
                    onClick={() => listingsViewMode()}>
                    <FontAwesomeIcon icon={faGripVertical} className={viewMode ? "opacity-100" : "opacity-50"} />
                    <FontAwesomeIcon icon={faList} className={viewMode ? "opacity-50" : "opacity-100"} />
                </div>
            </div>

            {viewMode ?
                <div className="GridView grid grid-cols-2 m-3 gap-4">
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                </div>
                :
                <div className="flex ListView">
                    <div>

                    </div>
                </div>
            }

        </div>
    )
}

const listingListStyle = "bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black "
const listingGridStyle = "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8" // gap tbd
