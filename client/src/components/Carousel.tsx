export default function Carousel() {

    return (
        <div>
            <div className="flex overflow-x-auto aspect-video scroll-smooth">
                <div className="relative mr-2 flex-none w-full aspect-video overflow-hidden rounded border-solid border border-black">
                    <img className="w-full h-full object-cover"
                        src="https://media.gq.com/photos/64f0f16a9bcd320056037b6d/16:9/w_1824,h_1026,c_limit/LOUIS%20VUITTON-%20BRADLEY%20COOPER%20(3).jpg" alt="" />
                </div>
            </div>
        </div>

    )
}