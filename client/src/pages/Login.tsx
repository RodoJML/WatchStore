import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "../components/LoginForm"
import { faChevronDown, faChevronUp, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";

interface LoginProps {
    isActive: boolean | undefined;
    onXclick: () => (void) | null;
}

export default function Login({ isActive, onXclick }: LoginProps) {

    const sessionState = useSelector((state: RootState) => state.session);
    
    return (
        // This is how the login page slides up when it detects that the state of the session is signed in
        <div className={`${isActive && !sessionState.signedIn ? loginPageActive : loginPageInactive}`}>

            <LoginForm/>
            {/* Once signed in the login page reacts like its closed */}

            <a className="relative -bottom-4" onClick={onXclick}>
                <FontAwesomeIcon className="text-lg" icon={faChevronUp} inverse />
            </a>

        </div>
    )
}

const loginPage = 'fixed grid items-center text-center bg-transparent w-full h-full ease-in-out duration-500 shadow-2xl backdrop-blur border border-white border-opacity-20 z-30 p-10 sm:p-20 md:p-40 lg:p-60 xl:p-80 z-20 overflow-scroll';
const loginPageActive = `${loginPage} h-screen top-0`;
const loginPageInactive = `${loginPage} -top-full`;