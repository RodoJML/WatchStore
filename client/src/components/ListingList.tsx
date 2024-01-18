import ListingCard from "./ListingCard";

export default function ListingList() {


    return (
        <>
            <div className="grid bg-green-900 bg-opacity-40 border border-white border-opacity-40 rounded p-2 shadow shadow-black">

                <div className="bg-wooden-pattern bg-2xl rounded-lg p-2 shadow shadow-black mb-4 h-40">
                    <div className="flex bg-amber-50 w-full h-full p-2 rounded shadow shadow-black border border-stone-800">
                        <img className="aspect-square h-full object-cover rounded shadow shadow-black mr-4"
                            src="https://www.watchesandcrystals.com/cdn/shop/articles/mens-gucci-watches-for-sale-that-is-worth-it-562855.jpg?v=1659676055" />
                        <div className="grid sm:grid-cols-2 ">
                            <div className="block overflow-hidden">
                                <div className="text-amber-900 opacity-60 font-serif font-extrabold text-lg uppercase whitespace-nowrap overflow-scroll -mb-1 -mt-1">AUDEMARS PIGE</div>

                                <div className="align-middle">
                                    <span className="text-3vw sm:text-xs">₡</span>
                                    <span className="text-lg text-stone-800 font-extrabold">100.000</span>
                                    <span className="text-3vw sm:text-xs ml-1 text-stone-800">$200</span>
                                </div>

                                <div className="text-xs">Dato 1</div>
                                <div className="text-xs">Dato 2</div>
                                <div className="text-xs">Dato 3</div>
                                <div className="text-xs">Dato 4</div>
                                <div className="text-xs">Dato 5</div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
}

//w-full h-48 for the white piece

