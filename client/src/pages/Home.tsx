import { useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import { Slide } from "../model/fetch";
import { RootState } from "../state/store/store";
import ListingCard from "../components/ListingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faList, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

    const sessionState = useSelector((state: RootState) => state.session);

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
        },
        {
            url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e3c80936323781.57188fa682761.jpg",
            title: "Hublot Watch",
            description: "Hublot is a Swiss luxury watchmaker founded in 1980 by Italian Carlo Crocco. The company operates as a wholly owned subsidiary of France's LVMH.",
        }
    ] as Slide[];

    return (
        <div>
            <div className="aspect-video m-2 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-72 2xl:mx-96">
                <Carousel slides={slides} />
            </div>

            <div className="flex justify-center m-3 text-xs">

                <div className="grid grid-cols-3 gap-4 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 mr-2 items-center">
                    <div className="font-extrabold">Todos</div>
                    <div className="opacity-50">Nuevos</div>
                    <div className="opacity-50">Usados</div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-black bg-opacity-20 text-white border border-black border-opacity-10 rounded p-1 px-2 items-center">
                    <FontAwesomeIcon icon={faList} className="opacity-50" />
                    <FontAwesomeIcon icon={faTableCellsLarge} />
                </div>

            </div>

            <div>
                <div className="grid grid-cols-2 m-3 gap-4">
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                </div>
            </div>




        </div>
    )
}