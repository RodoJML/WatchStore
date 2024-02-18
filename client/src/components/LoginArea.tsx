import { faRightFromBracket, faRightToBracket, faStore, faUserAstronaut, faUserLarge, faUserXmark } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RootState } from "../state/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addMessage, setNotification } from "../state/store/slice/sessionSlice"
import bellsAudio from "../assets/audio/Bells.mp3";


export default function LoginArea({ sessionStatus }: { sessionStatus: RootState['session']}) {

    const dispatch = useDispatch();
    const audio = new Audio(bellsAudio);

    useEffect(() => {
        if (sessionStatus.signedIn) {
            audio.play();
            dispatch(setNotification({ message: `Bienvenido ${sessionStatus.user.user_name}`, type: "success" }));
        }

        if(sessionStatus.user.user_type === 3){
            dispatch(addMessage({ message: `Regístrate totalmente grátis y desbloquea la habilidad de crear tu propia tienda 🏪, 
            editar tus publicaciones 📝, tener tu lista de deseos 🎁, y mucho más.`, type: "info" })); 

        }

    }, [sessionStatus.signedIn]);


    if (!sessionStatus.signedIn) {
        return <div className="cursor-pointer">
            <span className="text-sm">Iniciar Sesión</span>
            <FontAwesomeIcon icon={faUser} className="ml-1 fa-bounce" style={{ animationIterationCount: '10' }} inverse />
        </div>
    } else {
        return <>
            <label className="text-sm mr-1 capitalize">{sessionStatus.user.user_name}</label>
            {
                sessionStatus.user.user_type === 0 ? <FontAwesomeIcon icon={faUserAstronaut} /> :
                    sessionStatus.user.user_type === 1 ? <FontAwesomeIcon icon={faStore} /> :
                        sessionStatus.user.user_type === 2 ? <FontAwesomeIcon icon={faUserLarge}/> :
                            sessionStatus.user.user_type === 3 ? <FontAwesomeIcon icon={faUserXmark} /> :
                                <FontAwesomeIcon icon={faUserXmark} />
            }
        </>
    }
};