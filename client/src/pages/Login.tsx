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
        // This is how the login page slides up when it detects that the state of the session is signed in
        <div className={`${isActive && !sessionState.signedIn ? loginPageActive : loginPageInactive}`}>

            <LoginForm/>
            {/* Once signed in the login page reacts like its closed */}

            <a className="relative -bottom-8" onClick={onXclick}>
                <FontAwesomeIcon className="text-lg" icon={faChevronUp} inverse />
            </a>

        </div>
    )
}

const loginPage = 'grid items-center text-center absolute bg-transparent w-full h-full rounded rounded-l-none ease-in-out duration-500 shadow-2xl backdrop-blur border border-white border-opacity-20 z-10 p-10 sm:p-20 md:p-40 lg:p-60 xl:p-80 z-20 overflow-scroll';
const loginPageActive = `${loginPage} top-0`;
const loginPageInactive = `${loginPage} -top-full`;