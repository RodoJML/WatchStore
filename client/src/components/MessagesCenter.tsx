import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../state/store/store";
import { faCircleXmark, faEllipsis, faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearMessages } from "../state/store/slice/sessionSlice";



export default function MessagesCenter({ sessionStatus, onClick, isActive }: { sessionStatus: RootState['session'], onClick: (arg0: boolean) => (void), isActive: boolean }) {

    const [messagesPaneOpacity, setMessagesPaneOpacity] = useState(false);
    const [messagesWrap, setMessagesWrap] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(undefined as number | undefined);

    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessagesPaneOpacity(!messagesPaneOpacity);
        }, 50);
        return () => { clearTimeout(timeout) };
    }, [isActive])

    return (
        isActive &&

        <div className={`bg-black backdrop-blur absolute top-8 rounded-2xl z-40 transition-opacity ease-in-out w-72 sm:w-80 md:w-96 lg:w-full bg-opacity-40 p-4 border-solid border border-white border-opacity-30 drop-shadow-2xl shadow-black ${!messagesPaneOpacity ? "opacity-100" : "opacity-0"}`}>

            {sessionStatus.messages.length === 0
                ?
                <div className="text-white text-sm text-shadow shadow-black text-center">No hay mensajes nuevos</div>
                : (
                    <div className="grid grid-cols-1 gap-4">

                        <div className="grid grid-cols-2">
                            <div className="text-shadow shadow-black font-semibold">Mensajes</div>
                            <div className="flex justify-end items-center" onClick={() => { dispatch(clearMessages()); onClick(false); }}>
                                <FontAwesomeIcon className="opacity-50" icon={faCircleXmark} />
                            </div>
                        </div>

                        {sessionStatus.messages.map((message, index) => {
                            return <div key={index} className="grid grid-cols-10 text-white text-sm text-shadow shadow-black bg-white bg-opacity-40 border border-white border-opacity-20 rounded-md p-3" onClick={() => { setMessagesWrap(!messagesWrap); setClickedIndex(index); }}>
                                {/* <div className="flex bg-red-600 rounded-full w-5 mr-1 drop-shadow shadow-black overflow-visible justify-center">{index + 1}</div> */}
                                <div className={`overflow-scroll col-span-9 ${clickedIndex == index ? messagesWrap ? "text-wrap whitespace-normal" : "text-nowrap whitespace-nowrap" : ""}`}>{message.message}
                                </div>
                                <div className="text-right col-span-1" >
                                    {clickedIndex == index && messagesWrap
                                        ?
                                        <FontAwesomeIcon icon={faEnvelopeOpen} />
                                        :
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    }
                                </div>
                            </div>
                        })}
                    </div>
                )
            }

        </div>
    );
}