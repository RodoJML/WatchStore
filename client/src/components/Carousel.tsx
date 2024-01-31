import { useEffect, useState } from "react";
import { Slide } from "../model/fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface CarouselProps {
    slides: Slide[];
}

export default function Carousel({ slides }: CarouselProps) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const carousel_bg_img_style = {
        backgroundImage: `url(${slides[currentIndex].url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        // Do not set fixed height and width for the slider as we want it to be responsive
        // Width and height will be set by the parent container, wrap the carousel on a div and set dimensions there
        <div className="relative h-full text-white">
            <FontAwesomeIcon className="absolute top-1/2 left-4 z-10 opacity-65" icon={faChevronLeft}
                onClick={goToPrevious} />
            <div className="w-full h-full rounded shadow shadow-black transition-right duration-500 ease-in-out" style={carousel_bg_img_style}></div>
            <FontAwesomeIcon className="absolute top-1/2 right-4 z-10 opacity-65" icon={faChevronRight}
                onClick={goToNext} />
        </div>
    )
}


