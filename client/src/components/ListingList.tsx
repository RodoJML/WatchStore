import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { ListingPreviewItem } from "../state/store/slice/listingsSlice";
import { useState } from "react";

interface ListingListProps {
    listingPreview: ListingPreviewItem;
}

export default function ListingList({ listingPreview }: ListingListProps) {

    const [listingDate, setListingDate] = useState(new Date(listingPreview.date));
    const [currentDate, setCurrentDate] = useState(new Date());
    const days = Math.floor((currentDate.getTime() - listingDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <>
            <div className="relative bg-wooden-pattern bg-2xl rounded-lg p-2 shadow shadow-black mb-5 h-40">

                {listingPreview.listing_type === 1 &&
                    <div className="ribbon"><span>Original</span></div>
                }

                <div className="flex bg-amber-50 w-full h-full p-2 rounded shadow shadow-black border border-stone-800">

                    <div className="relative aspect-square mr-2">
                        <img className="w-full h-full object-cover rounded shadow shadow-black"
                            src="https://www.watchesandcrystals.com/cdn/shop/articles/mens-gucci-watches-for-sale-that-is-worth-it-562855.jpg?v=1659676055" />

                        <div className="absolute bottom-1 left-2 text-xs text-white opacity-50">
                            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#ffffff", opacity: 0.7 }} />
                            <i> {days} dias</i>
                        </div>

                        <div className="absolute bottom-1 right-2 text-xs text-white opacity-50">
                            <FontAwesomeIcon icon={faEye} style={{ color: "#ffffff", opacity: 0.7 }} />
                            <i> {listingPreview.views ? listingPreview.views : 0}</i>
                        </div>

                    </div>


                    <div className="grid">
                        <div className="block overflow-hidden">
                            <div className="text-amber-900 opacity-60 font-serif font-extrabold text-lg uppercase whitespace-nowrap overflow-scroll -mb-2 -mt-1">{listingPreview.brand}</div>
                            <div className="text-md text-amber-950 font-light capitalize -mb-1">{listingPreview.model}</div>

                            <div className="align-middle">
                                <span className="text-xs">₡</span>
                                <span className="text-lg text-stone-700 font-extrabold">{listingPreview.cprice.toLocaleString()}</span>
                                <span className="text-xs ml-1 text-stone-700">(${listingPreview.dprice ? listingPreview.dprice : (listingPreview.cprice / 500).toLocaleString()})</span>
                            </div>

                            <div className="grid grid-cols-2 text-2xs text-stone-700">
                                <div className="font-bold">Movimiento:</div>
                                <div>{listingPreview.movement}</div>
                                <div className="font-bold">Condicion:</div>
                                <div>{listingPreview.condition == 1 ? "Nuevo" : "Usado"}</div>
                                <div className="font-bold">Garantia:</div>
                                {listingPreview.guarantee == 1 ? <div>{listingPreview.guarantee} mes</div> : <div>{listingPreview.guarantee} meses</div>}
                                <div className="font-bold">Tamaño:</div>
                                <div>{listingPreview.width}mm</div>
                            </div>

                        </div>
                    </div>


                    <div className="hidden sm:block sm:w-40 sm:h-full sm:visible sm:ml-auto sm:mt-6 sm:mr-4 text-stone-800 text-xs">
                        <div className="hidden sm:visible sm:grid sm:grid-cols-2">
                            <div>Rating:</div>
                            <span>

                                {listingPreview.rating < 1 &&
                                    <i>No reviews</i>
                                }

                                {listingPreview.rating >= 1 && listingPreview.rating < 2 &&
                                    <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0s' }} />
                                }

                                {listingPreview.rating >= 2 && listingPreview.rating < 3 &&
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.06s' }} />
                                    </div>
                                }

                                {listingPreview.rating >= 3 && listingPreview.rating < 4 &&
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.06s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.12s' }} />
                                    </div>
                                }

                                {listingPreview.rating >= 4 && listingPreview.rating < 5 &&
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.06s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.12s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.18s' }} />
                                    </div>
                                }

                                {listingPreview.rating >= 5 &&
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.06s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.12s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.18s' }} />
                                        <FontAwesomeIcon icon={faStar} className="fa-bounce" style={{ animationIterationCount: '1', animationDelay: '0.24s' }} />
                                    </div>
                                }

                            </span>
                            <div>Tienda:</div>
                            <div>{listingPreview.store_name}</div>
                            <div>Cantidad:</div>
                            <div>{listingPreview.quantity}</div>
                            <div>Ubicación:</div>
                            <div>{listingPreview.location}</div>
                            <div>Vendedor: </div>
                            <div>{listingPreview.user_name}</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
