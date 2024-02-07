import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faList } from "@fortawesome/free-solid-svg-icons";
import ListingCard from "../components/ListingCard";
import ListingList from "../components/ListingList";
import { ListingPreviewItem, getAll_orig_previews } from "../state/store/slice/listingsSlice";


export default function Listing() {

    const listingState = useSelector((state: RootState) => state.listings);
    const dispatch = useDispatch<AppDispatch>();

    const [condition, setCondition] = useState(1);
    const [viewMode, setViewMode] = useState(true);
    const [listingsPreviews, setlistingsPreviews] = useState([] as ListingPreviewItem[]);  // This is the state that will hold the listings // useState<DataEnvelopeList<ListingItem>>();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);


    function watchCondition(condition: number) {
        // Condition 1: "todos", 2: "nuevos", 3: "usados"
        setCondition(condition);
    }

    function listingsViewMode() {
        // Mode true: "grid", false: "list"
        setViewMode(!viewMode);
    }

    useEffect(() => {
        dispatch(getAll_orig_previews({ page, pageSize })).then((data: any) => {
            setlistingsPreviews(data.payload.data);
            console.log(listingsPreviews);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    // This use effect is running everytime im at home even though this is not the home rout this is listing route
    // this is because the home route is the index route and the index route is the default route
    // to fix this i need to add a condition to check if the route is the home route
    useEffect(() => {
        const handleScroll = () => {
            // Reads the position of the scroll
            const currentScrollPos = window.scrollY;

            // If the current scroll position is greater than the previous scroll position
            // then do the next if, this is to prevent the use effect to run when the user
            // is scrolling up
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight
                && !listingState.isLoading
                && currentScrollPos > scrollPosition) {
                // The next if what is does is saying if window.innerHeight so if the window height plus 
                // the window scrollY, the scrollY is the position of the scroll, is greater or equal to the
                // document.body.offsetHeight - 100, offsetHeight is the height of the body, so if the window
                // height plus the scrollY is greater or equal to the height of the body minus 100 pixels then
                // do something, in this case setPage((prevPage) => prevPage + 1), so the page is going to be updated.
                // In the if we check if the listingState.isLoading is false, because if the listingState.isLoading
                // is true then we are already loading the data so we don't want to load the data again, so if the
                // listingState.isLoading is false then we can load the data.
                setPage((prevPage) => prevPage + 1);

                dispatch(getAll_orig_previews({ page: page + 1, pageSize: pageSize })).then((data: any) => {
                    setlistingsPreviews((prevListings) => [...prevListings, ...data.payload.data]);
                    console.log(listingsPreviews);
                })

            }
            setScrollPosition(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
        // The use effect is set to the loading state, so when the loading state changes the use effect is going to run
        // we are not doing it directly when the scroll changes because we don't want to run the use effect every time
        // the scroll changes, we only want to run the use effect when the loading state changes.
    }, [listingState.isLoading, scrollPosition, page, pageSize, dispatch]);

    return (
        <div>
            <div className="flex justify-center m-3 text-xs">
                <div className="grid grid-cols-3 gap-2 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 mr-1 items-center font-bold text-center">
                    <div className={condition === 1 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(1)}>Todos</div>
                    <div className={condition === 2 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(2)}>Nuevos</div>
                    <div className={condition === 3 ? "opacity-100 cursor-default" : "cursor-pointer opacity-50"} onClick={() => watchCondition(3)}>Usados</div>
                </div>


                <select className="bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 mr-1">
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
                    <div className={listingGridStyle}>
                        {/* The loading style for grid view happens inside the component */}
                        {listingsPreviews.map((listingPreview: ListingPreviewItem, index: number) => {
                            return <ListingCard
                                key={listingPreview.listing_type.toString() + listingPreview.stock_id.toString() + listingPreview.store_user_id.toString()}
                                isLoading={listingState.isLoading}
                                listingPreview={listingPreview}
                            />
                        })}
                    </div>
                )
                :
                (listingState.isLoading
                    ?
                    <>
                        <div className={`${listingListStyle} animate-pulse`}>
                            <div className="flex h-screen justify-center p-28">
                                <img className="h-10 rounded-full animate-spin"
                                    src="/src/assets/images/loading.png" alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className={listingListStyle} >
                        <ListingList />

                    </div>
                )
            }

        </div>
    )
}

const listingListStyle = "bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black mx-2 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-72 2xl:mx-96"
const listingGridStyle = "grid grid-cols-2 m-2 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-72 2xl:mx-96" 
