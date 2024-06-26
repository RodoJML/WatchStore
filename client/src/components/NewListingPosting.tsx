import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faX } from "@fortawesome/free-solid-svg-icons";

export default function NewListingPosting({ isSuccess }: { isSuccess: number }) {

    const listingState = useSelector((state: RootState) => state.listings);
    // The "isSucces" here means that the info of the posting and the photos were uploaded successfully. 

    return (
        <>
            {listingState.isLoading == true || isSuccess == 0 ?
                <div className="flex items-center justify-center mt-20">
                    <div>
                        <FontAwesomeIcon icon={faSpinner} className="text-9xl text-lume-100 fa-spin" />
                    </div>
                </div>
                :


                isSuccess == 1
                    ?
                    <div className="flex items-center justify-center mt-20">
                        <div className="w-60 text-sm text-white text-shadow shadow-black">

                            <div className="flex items-center justify-center w-full">
                                <FontAwesomeIcon className="text-9xl text-lume-100" icon={faCheck} />
                            </div>

                            <div className="w-full bg-black bg-opacity-30 p-3 text-center mt-5 rounded-md border border-white border-opacity-60">
                                <div className="grid gap-5">
                                    <div>Reloj publicado con exito!</div>
                                    <div className="animate-pulse">Redirigiendo a la página principal.</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    :

                    isSuccess > 1
                    &&
                    <div className="flex items-center justify-center mt-20">
                        <div className="w-60 text-sm text-white text-shadow shadow-black">

                            <div className="flex items-center justify-center w-full">
                                <FontAwesomeIcon icon={faX} className="text-9xl text-red-800" />
                            </div>

                            <div className="w-full bg-black bg-opacity-30 p-3 text-center mt-5 rounded-md border border-white border-opacity-60">
                                <div className="grid gap-5">
                                    <div>Lo sentimos, ha ocurrido un error al intentar publicar su reloj. Por favor, inténtelo de nuevo.</div>
                                    <div>Si el inconveniente continúa, ponerse en contacto con soporte para recibir asistencia adicional.</div>
                                    <div>Contacto: correo@desoporte.aqui</div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}