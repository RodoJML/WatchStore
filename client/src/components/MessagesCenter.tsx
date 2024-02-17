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

        <div className={`grid grid-cols-1 gap-4 bg-black backdrop-blur absolute top-8 rounded-2xl z-40 transition-opacity ease-in-out w-72 bg-opacity-30 p-4 border-solid border border-white border-opacity-30 drop-shadow-2xl shadow-black ${!messagesPaneOpacity ? "opacity-100" : "opacity-0"}`}>

            {sessionStatus.messages.length === 0
                ?
                <div className="text-white text-sm text-shadow shadow-black">No hay mensajes nuevos</div>
                : (sessionStatus.messages.map((message, index) => {
                    return <div key={index}>
                        <div className="flex text-white text-sm text-shadow shadow-black">
                            {/* <div className="flex bg-red-600 rounded-full w-5 mr-1 drop-shadow shadow-black overflow-visible justify-center">{index + 1}</div> */}
                            <div className={`overflow-scroll ${clickedIndex == index ? messagesWrap ? "text-wrap whitespace-normal" : "text-nowrap whitespace-nowrap" : ""}`}>{message.message}</div>
                            <div className="ml-3" onClick={() => { setMessagesWrap(!messagesWrap); setClickedIndex(index); }}>
                                {clickedIndex == index && messagesWrap
                                    ?
                                    <FontAwesomeIcon icon={faEnvelopeOpen} />
                                    :
                                    <FontAwesomeIcon icon={faEnvelope} />
                                }
                            </div>
                        </div>
                        
                    </div>






                }))
            }

            <div className="flex justify-center items-center" onClick={() => { dispatch(clearMessages()); onClick(false); }}>
                <FontAwesomeIcon className="text-shadow shadow-black" icon={faCircleXmark} />
            </div>

        </div>
    );
}