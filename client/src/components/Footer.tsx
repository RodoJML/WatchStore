import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <div className="bg-gradient-to-b from-stone-900 to-stone-700 w-full h-full text-white text-center text-sm">

                <div className="bg-stone-700 cursor-pointer py-1" onClick={scrollToTop}>
                    Volver al inicio <FontAwesomeIcon icon={faAngleUp} />
                </div>

                <div className="grid grid-cols-2 p-2">
                    <div className="flex justify-center">
                        <div>
                            <div>Test 1</div>
                            <div>Test 2</div>
                            <div>Test 3</div>
                        </div>

                    </div>
                    <div className="flex justify-center">
                        <div>
                            <div>Test 1</div>
                            <div>Test 2</div>
                            <div>Test 3</div>
                        </div>
                    </div>
                </div>

                <div className="bg-stone-900 text-xs p-2">
                    2024 WatchStore
                </div>
            </div>
        </div>
    )
}

