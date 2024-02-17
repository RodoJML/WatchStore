import { faRightFromBracket, faRightToBracket, faStore, faUserAstronaut, faUserLarge, faUserXmark } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RootState } from "../state/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addMessage, setNotification } from "../state/store/slice/sessionSlice"
import bellsAudio from "../assets/audio/Bells.mp3";


export default function LoginArea({ sessionStatus, Logout }: { sessionStatus: RootState['session'], Logout: () => (void) }) {

    const dispatch = useDispatch();
    const audio = new Audio(bellsAudio);

    useEffect(() => {
        if (sessionStatus.signedIn) {
            audio.play();
            dispatch(setNotification({ message: `Bienvenido ${sessionStatus.user.user_name}`, type: "success" }));
        }

        if(sessionStatus.user.user_type === 3){
            dispatch(addMessage({ message: `Regístrarse es grátis, ir a iniciar sesion!`, type: "info" }));
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
                sessionStatus.user.user_type === 0 ? <FontAwesomeIcon icon={faUserAstronaut} className="mr-2" /> :
                    sessionStatus.user.user_type === 1 ? <FontAwesomeIcon icon={faStore} className="mr-2" /> :
                        sessionStatus.user.user_type === 2 ? <FontAwesomeIcon icon={faUserLarge} className="mr-2" /> :
                            sessionStatus.user.user_type === 3 ? <FontAwesomeIcon icon={faUserXmark} className="mr-2" /> :
                                <FontAwesomeIcon icon={faUserXmark} />
            }
            <a href="/" onClick={Logout}>
                <FontAwesomeIcon className="cursor-pointer" icon={faRightFromBracket} />
            </a>
        </>
    }
};