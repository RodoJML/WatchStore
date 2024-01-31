import Carousel from "../components/Carousel";
import { Slide } from "../model/fetch";

export default function Home() {

    const slides = [
        {
            url: "https://blog.crownandcaliber.com/wp-content/uploads/2015/07/George-Clooney-OMEGA-1-1280x720.jpg",
            title: "Eterna Watch",
            description: "Eterna Watch is a Swiss luxury watch company founded in Grenchen, Canton of Solothurn in 1856 by Josef Girard and Urs Schild.",
        },
        {
            url: "https://assets.vogue.in/photos/6332d37b493463f2eed338d8/16:9/w_1280,c_limit/RO_26579CS-OO-1225CS-01_closeup_GP14_JPEG_002.jpeg",
            title: "Louis Vuitton",
            description: "Louis Vuitton Malletier, commonly known as Louis Vuitton, is a French luxury fashion and leather goods brand and company, headquartered in Paris, France.",
        },
        {
            url: "https://hd.wallpaperswide.com/thumbs/hublot_watch-t2.jpg",
            title: "Hublot Watch",
            description: "Hublot is a Swiss luxury watchmaker founded in 1980 by Italian Carlo Crocco. The company operates as a wholly owned subsidiary of France's LVMH.",
        }
    ] as Slide[];

    return (
        <div>

            <div className="aspect-video m-2">
                <Carousel slides={slides} />
            </div>

        </div>
    )
}