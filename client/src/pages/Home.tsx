import { useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import { Slide } from "../model/interfaces";
import Listings from "./Listings";
import { RootState } from "../state/store/store";

export default function Home() {

    const slides = [
        {
            url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/88ae4736323781.57188fa682037.jpg",
            title: "Eterna Watch",
            description: "Eterna Watch is a Swiss luxury watch company founded in Grenchen, Canton of Solothurn in 1856 by Josef Girard and Urs Schild.",
        },
        {
            url: "https://timeandtidewatches.com/wp-content/uploads/2019/12/Advert-TAG.jpg",
            title: "Louis Vuitton",
            description: "Louis Vuitton Malletier, commonly known as Louis Vuitton, is a French luxury fashion and leather goods brand and company, headquartered in Paris, France.",
        }
    ] as Slide[];

    const listingState = useSelector((state: RootState) => state.listings);

    return (
        <div className="m-2 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-72 2xl:mx-96">

            {!listingState.searchInitiated &&
                <div className="aspect-video">
                    <Carousel slides={slides} />
                </div>
            }

            <Listings />

        </div>
    )
}

// Filter per route, example watchstore.com/used