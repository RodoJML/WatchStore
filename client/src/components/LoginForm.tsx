import { useState } from "react";
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

    const toggleRegisterForm = () => {
        setRegisterFormActive(!registerFormActive);
    }

    return (
        <form className="grid row-span-3" onSubmit={handleSubmit}>

            <div className="grid">
                <div className="flex text-white text-3xl">
                    <span className="font-bold">⌚️Watch</span>
                    <span className="font-light">Store</span>
                </div>

                <span className="text-sm mb-6 text-left text-white">
                    Inicia sesión o <a className="text-white underline" onClick={toggleRegisterForm}>crea una cuenta nueva</a>
                </span>

              
                <input className={registerFormActive ? registrationFormStyleActive :registrationFormStyleInactive} type="text" name="user" placeholder="Nombre de usuario" />
                <input className={registerFormActive ? registrationFormStyleActive :registrationFormStyleInactive} type="text" pattern="[0-9]{8}" name="phone" placeholder="Telefono (8 Digitos)" />
                <input className="h-10 mb-4 rounded border pl-2" type="text" name="email" placeholder="Correo" onChange={handleChange} />
                <input className="h-10 mb-4 rounded pl-2" type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                <input className={registerFormActive ? registrationFormStyleActive :registrationFormStyleInactive} type="password" name="passwordConfirm" placeholder="Confirmar la contrasena" />
                <button className="bg-stone-800 mb-4 text-white font-bold h-12 rounded" type="submit" onClick={handleSubmit}>
                    {sessionState.isLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Iniciar Sesión"}
                </button>

                <a className="text-sm text-white" onClick={toggleRegisterForm}> Olvidaste la contraseña? </a>

            </div>

        </form>
    )
}

const registrationFormStyleBase = "rounded border pl-2";
const registrationFormStyleActive = `${registrationFormStyleBase} h-10 mb-4 opacity-1 transition ease-in duration-700`;
const registrationFormStyleInactive = `${registrationFormStyleBase} h-0 mb-0 opacity-0`;
