import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort, faGripVertical, faHand, faList, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ListingCard from "../components/ListingCard";
import ListingList from "../components/ListingList";
import { ListingPreviewItem, getAll_previews } from "../state/store/slice/listingsSlice";


export default function Listing() {

    const listingState = useSelector((state: RootState) => state.listings);
    const dispatch = useDispatch<AppDispatch>();

    const [condition, setCondition] = useState(1);
    const [viewMode, setViewMode] = useState(true);
    const [listingsPreviews, setlistingsPreviews] = useState([] as ListingPreviewItem[]);  // This is the state that will hold the listings // useState<DataEnvelopeList<ListingItem>>();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [previousScrollTop, setPreviousScrollTop] = useState(0); // Used in handleScroll to determine if we are scrolling up or down

    function watchCondition(condition: number) {
        // Condition 1: "todos", 2: "nuevos", 3: "usados"
        setCondition(condition);
    }

    function listingsViewMode() {
        // Mode true: "grid", false: "list"
        setViewMode(!viewMode);
    }

    useEffect(() => {
        // All isMounted can be removed in production since React.StrictMode is not used
        // It is used to avoid a warning in the console of duplicated values
        let isMounted = true;
        const fetchData = async () => {

            // For some reason the response is an array of arrays, so we flatten it with reduce
            const response = (await dispatch(getAll_previews(page)).unwrap()).data;
            const morePreviews = response.reduce((acc, val) => acc.concat(val), []);
            setHasMore(morePreviews.length > 0);

            if (isMounted) {
                setlistingsPreviews((prevPreviews) => [...prevPreviews, ...morePreviews]);
            }
        };

        if (isMounted && hasMore) fetchData();

        return () => { isMounted = false };

    }, [page]);

    const handleScroll = () => {
        // When we scroll all the way down (Top + windowHeight) summed together are equal to Height
        var height = document.documentElement.scrollHeight;
        var top = document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;

        // If met, you are at the bottom of the page (windowHeight + top) + 1 >= height
        // If met, you are scrolling down (top > previousScrollTop)
        if ((windowHeight + top) + 1 >= height && top > previousScrollTop && hasMore) {
            setPage(previousPage => previousPage + 1);
        }

        // Update the previous scroll position for the next check
        setPreviousScrollTop(top);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <div className="flex justify-center m-3 text-xs">
                <div className="grid grid-cols-3 gap-2 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 mr-1 items-center font-bold text-center">
                    <div className={condition === 1 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(1)}>Todos</div>
                    <div className={condition === 2 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(2)}>Nuevos</div>
                    <div className={condition === 3 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(3)}>Usados</div>
                </div>


                <select className="bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 mr-1" name="priceFilter" id="priceFilter">
                    <option value="desc">Mayor a menor ₡</option>
                    <option value="asc">Menor a mayor ₡</option>
                </select>


                <div className="grid grid-cols-2 gap-2 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 items-center cursor-pointer"
                    onClick={() => listingsViewMode()}>
                    <FontAwesomeIcon icon={faGripVertical} className={viewMode ? "opacity-100" : "opacity-50"} />
                    <FontAwesomeIcon icon={faList} className={viewMode ? "opacity-50" : "opacity-100"} />
                </div>
            </div>

            {viewMode
                ?
                (
                    <div>
                        <div className={listingGridStyle}>
                            {listingsPreviews.map((listingPreview: ListingPreviewItem, index: number) => {
                                return <ListingCard
                                    key={listingPreview.listing_type.toString() + listingPreview.store_user_id.toString() + listingPreview.stock_id.toString()}
                                    isLoading={listingState.isLoading}
                                    listingPreview={listingPreview}
                                />
                            })}
                        </div>
                    </div>
                )
                :
                <div>
                    <div className={listingListStyleNB}>
                        {listingsPreviews.map((listingPreview: ListingPreviewItem, index: number) => (
                            <ListingList key={listingPreview.listing_type.toString() + listingPreview.store_user_id.toString() + listingPreview.stock_id.toString()}
                                listingPreview={listingPreview}
                            />
                        ))}
                    </div>
                </div>
            }

            {listingsPreviews.length > 0 &&
                <div className="flex justify-center text-white text-center mt-8 mb-14">
                    <div className="bg-black bg-opacity-20 border border-black border-opacity-20 rounded w-2/3 p-1">
                        {hasMore ?
                            (
                                listingState.isLoading
                                    ? <div>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin ml-1" />
                                    </div>
                                    : <div>Ver más resultados
                                        <FontAwesomeIcon icon={faArrowDownWideShort} className="ml-1" />
                                    </div>
                            )
                            : <div>
                                No hay más resultados
                                <FontAwesomeIcon icon={faHand} className="ml-1"/>
                            </div>}
                    </div>
                </div>
            }




        </div>
    )
}

const listingListStyle = "bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black mx-2 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-72 2xl:mx-96"
const listingListStyleNB = "mx-2 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-72 2xl:mx-96"
const listingGridStyle = "grid grid-cols-2 m-2 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 md:mx-10 lg:mx-10 xl:mx-10 2xl:mx-10" 
