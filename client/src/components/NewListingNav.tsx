import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NewListingNav({ currentStep }: { currentStep: number }) {
    return (
        <div className="grid grid-cols-3 bg-gradient-to-b from-stone-700 to-stone-900 text-white p-2 border-b border-black">

            <button className="flex justify-start items-center">

                <Link to="/" className="flex text-white font-bold text-sm bg-white bg-opacity-10 rounded items-center justify-center p-1.5">
                    <div><FontAwesomeIcon icon={faHouse} className="text-xl text-lume-100 " /></div>
                    <div className="ml-1">Home</div>
                </Link>
            </button>

            {currentStep == 1 &&
                <div className="flex justify-center items-center font-bold">
                    Inicia tu venta!
                </div>
            }

            {currentStep == 2 &&
                <div className="flex justify-center items-center font-bold">
                    Caracteristicas
                </div>
            }

            {currentStep == 3 &&
                <div className="flex justify-center items-center font-bold">
                    Inventario
                </div>
            }

            {currentStep == 4 &&
                <div className="flex justify-center items-center font-bold">
                    Publicación
                </div>
            }

            {currentStep == 5 &&
                <div className="flex justify-center items-center font-bold">
                    Publicando...
                </div>
            }


            <div className="flex justify-end items-center">
                <div className="text-xl text-lume-100 text-shadow shadow-lume-100 font-bold mx-1">?</div>
            </div>
        </div>
    )
}