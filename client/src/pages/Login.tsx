import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "../components/LoginForm"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
    isActive: boolean;
    onXclick: () => (void);
}

export default function Login({ isActive, onXclick }: LoginProps) {
    return (
        <div className={`${isActive ? loginFormActive : loginFormInactive}`}>

            <div className="grid ">

                <div className="relative bg-stone-800 opacity-40 ">
       
                </div>

                <div className="text-white text-3xl text-center">
                    <span className="font-bold ml-1">⌚️Tico</span>
                    <span className="font-light">Toc</span>
                </div>
                
                <div className="text-3xl text-white font-extrabold">
                    Bienvenido
                </div>
                <LoginForm />
                
                <a onClick={onXclick}>
                    <FontAwesomeIcon icon={faCircleXmark} inverse />
                </a>
            </div>





        </div>
    )
}

const loginFormBaseStyle = 'absolute bg-transparent w-full h-full rounded rounded-l-none ease-in-out duration-500 shadow-2xl backdrop-blur border border-white border-opacity-20 z-10 transition-all p-10';
const loginFormActive = `${loginFormBaseStyle} top-0`;
const loginFormInactive = `${loginFormBaseStyle} -top-full`;

// right left top bottom