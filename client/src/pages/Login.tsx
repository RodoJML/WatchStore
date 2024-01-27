import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "../components/LoginForm"
import { faChevronDown, faChevronUp, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";

interface LoginProps {
    isActive: boolean;
    onXclick: () => (void);
}

export default function Login({ isActive, onXclick }: LoginProps) {

    const sessionState = useSelector((state: RootState) => state.session);
    
    return (
        <div className={`${isActive && !sessionState.signedIn ? loginFormActive : loginFormInactive}`}>

            <LoginForm/>
            {/* Once signed in the login page reacts like its closed */}

            <a className="absolute bottom-4 left-0 right-0" onClick={onXclick}>
                <FontAwesomeIcon className="text-lg" icon={faChevronUp} inverse />
            </a>

        </div>
    )
}

const loginFormBaseStyle = 'grid grid-rows-4 items-center text-center absolute bg-transparent w-full h-full rounded rounded-l-none ease-in-out duration-500 shadow-2xl backdrop-blur border border-white border-opacity-20 z-10 p-10 sm:p-20 md:p-40 lg:p-60 xl:p-80 z-20';
const loginFormActive = `${loginFormBaseStyle} top-0`;
const loginFormInactive = `${loginFormBaseStyle} -top-full`;

// right left top bottom