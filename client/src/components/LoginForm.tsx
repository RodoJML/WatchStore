import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { login } from "../state/store/slice/sessionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "", });
    const [registerFormActive, setRegisterFormActive] = useState(false);
    const [registerFormStyle, setRegisterFormStyle] = useState(registrationFormStyle0);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // e comes from the event listener, a default behavior of react
        // event listener is the submit button
        dispatch(login(loginFormData));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle form field changes and update the state
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleRegFormToggle = () => {
        setRegisterFormActive(!registerFormActive);
        setRegisterFormStyle(registrationFormStyle1);
        setTimeout(() => setRegisterFormStyle(registrationFormStyle2), 50);
    };

    return (
        <form className="grid" onSubmit={handleSubmit}>


            <div className="flex text-white text-3xl">
                <span className="font-bold">⌚️Watch</span>
                <span className="font-light">Store</span>
            </div>

            <span className="text-sm mb-6 text-left text-white">
                Inicia sesión o <a className="text-white underline"
                    onClick={handleRegFormToggle}>crea una cuenta nueva</a>
            </span>

            {registerFormActive && <input className={registerFormStyle} type="text" name="user" placeholder="Nombre de usuario" required />}
            {registerFormActive && <input className={registerFormStyle} type="text" pattern="\d{8}" name="phone" placeholder="Telefono (8 Digitos)" required />}
            <input className="h-10 mb-4 rounded border pl-2" type="text" name="email" placeholder="Correo" onChange={handleChange} required />
            <input className="h-10 mb-4 rounded pl-2" type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            {registerFormActive && <input className={registerFormStyle} type="password" name="passwordConfirm" placeholder="Confirmar la contrasena" required />}

            {!registerFormActive
                ?
                (<div className="grid">
                    <button className="bg-stone-800 mb-4 text-white font-bold h-12 rounded transition-colors ease-in-out duration-1000" type="submit">
                        {sessionState.isLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Iniciar Sesión"}
                    </button>
                    <a className="text-sm text-white"> Olvidaste la contraseña? </a>
                </div>)
                :
                (<button className="bg-blue-800 mb-4 text-white font-bold h-12 rounded transition-colors ease-in-out duration-1000" type="submit">
                    {sessionState.isLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Registrarse"}
                </button>)
            }
            





        </form>
    )
}

const registrationFormStyle0 = "rounded border pl-2 transition-all ease-in-out duration-300";
const registrationFormStyle1 = `${registrationFormStyle0} h-0 mb-0 opacity-0`;
const registrationFormStyle2 = `${registrationFormStyle0} h-10 mb-4 opacity-1`;