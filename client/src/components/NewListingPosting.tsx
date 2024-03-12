import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { useEffect } from "react";

export default function NewListingPosting({ isSuccess }: { isSuccess: boolean }) {

    const listingState = useSelector((state: RootState) => state.listings);

    return (
        <>
            {listingState.isLoading ?
                <div className="flex items-center justify-center mt-20">
                    <div>
                        <img className="w-24" src="/src/assets/images/posting.gif" />
                    </div>
                </div>
                :
                (isSuccess == true && listingState.isLoading == false
                    ?
                    <div className="flex items-center justify-center mt-20">
                        <div className="w-60 text-sm text-white text-shadow shadow-black">
                            
                            <div className="flex items-center justify-center w-full">
                                <img className="w-24" src="/src/assets/images/success.png" />
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
                    <div className="flex items-center justify-center mt-20">
                        <div className="w-60 text-sm text-white text-shadow shadow-black">

                            <div className="flex items-center justify-center w-full">
                                <img className="w-24 " src="/src/assets/images/fail.png" />
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
                )}
        </>
    )
}