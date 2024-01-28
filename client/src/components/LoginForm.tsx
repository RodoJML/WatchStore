import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { exist, login } from "../state/store/slice/sessionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleNotch, faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { DataEnvelope } from "../model/fetch";

export default function LoginForm() {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const [loginFormData, setLoginFormData] = useState({ user_email: "", user_password: "", });
    const [signUpFormData, setSignUpFormData] = useState(
        {
            ...loginFormData,
            user_name: "",
            user_id: "",
            user_password: "",
            user_password_confirmation: "",
            info_user_province: "",
        }
    );
    const [user_name_Exist, set_user_name_Exist] = useState(false);
    const [user_email_Exist, set_user_email_Exist] = useState(false);
    const [user_id_Exist, set_user_id_Exist] = useState(false);
    const [pw_mismatch, set_pw_mismatch] = useState(false);
    const [formInput, setFormInput] = useState(false);

    const [signupFormActive, setsignupFormActive] = useState(false);
    const [signupFormStyle, setsignupFormStyle] = useState(signupFormStyle0);
    const provinces = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste", "Puntarenas", "Limon"];

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        const submitter = e.nativeEvent.submitter as HTMLButtonElement;
        // e comes from the event listener, a default behavior of react
        // event listener is the submit button
        if (submitter.name === "login") {
            dispatch(login(loginFormData));
        } else if (submitter.name === "signup") {
            if (signUpFormData.user_password != signUpFormData.user_password_confirmation) {
                alert("Las contraseñas no coinciden");
            } else {
                console.log(signUpFormData);
                // dispatch(signup(signUpFormData));
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle form field changes and update the state
        setFormInput(true);
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
        setSignUpFormData({ ...signUpFormData, [name]: value });
    };

    const handleRegFormToggle = () => {
        setsignupFormActive(!signupFormActive);
        setsignupFormStyle(signupFormStyle1);
        setTimeout(() => setsignupFormStyle(signupFormStyle2), 50);
    };

    if (formInput) {

    }

    useEffect(() => {
        if (signupFormActive) {
            dispatch(exist({ column_name: "user_name", key: signUpFormData.user_name })).then(
                (response: any) => {
                    set_user_name_Exist(response.payload.data);
                }
            ).catch(
                (error: any) => {
                    console.log("The alias field might be empty " + error);
                }
            );

            dispatch(exist({ column_name: "user_email", key: signUpFormData.user_email })).then(
                (response: any) => {
                    set_user_email_Exist(response.payload.data);
                }
            ).catch(
                (error: any) => {
                    console.log("The email field might be empty " + error);
                }
            );

            dispatch(exist({ column_name: "user_id", key: signUpFormData.user_id })).then(
                (response: any) => {
                    set_user_id_Exist(response.payload.data);
                }
            ).catch(
                (error: any) => {
                    console.log("The id field might be empty " + error);
                }
            );

            if (signUpFormData.user_password != signUpFormData.user_password_confirmation) {
                set_pw_mismatch(true);
            } else {
                set_pw_mismatch(false);
            };
        }
    }, [signUpFormData.user_name, signUpFormData.user_email,
    signUpFormData.user_id, signUpFormData.user_password_confirmation,]);


    return (
        <form className="grid" onSubmit={handleSubmit}>

            <div className="flex text-white text-3xl">
                <span className="font-bold text-shadow shadow-black">⌚️Watch</span>
                <span className="font-light text-shadow shadow-black">Store</span>
            </div>

            {!signupFormActive
                ?
                <span className="text-sm mb-6 text-left text-white text-shadow shadow-black">
                    Inicia sesión o <a className="text-white underline"
                        onClick={handleRegFormToggle}>crea una cuenta nueva.</a>
                </span>
                :
                <span className="text-sm mb-6 text-left text-white text-shadow shadow-black">
                    <a className="text-white underline"
                        onClick={handleRegFormToggle}>Inicia sesión</a> o crea una cuenta nueva.
                </span>
            }


            {signupFormActive && <input className={signupFormStyle} type="text" pattern="^[^\s]+$" name="user_name" placeholder="Alias | Sin espacios - Min 6 letras" onChange={handleChange} required />}
            {signupFormActive && <input className={signupFormStyle} type="text" pattern="\d{8}" name="user_id" placeholder="Telefono | 8 Digitos" onChange={handleChange} required />}
            <input className="h-10 mb-4 rounded border pl-2" type="text" name="user_email" placeholder="Correo" onChange={handleChange} required />
            <input className="h-10 mb-4 rounded pl-2" type="password" name="user_password" placeholder="Contraseña" onChange={handleChange} required />
            {signupFormActive && <input className={signupFormStyle} type="password" name="user_password_confirmation" placeholder="Confirmar contraseña" onChange={handleChange} required />}
            {signupFormActive &&
                <select name="info_user_province" className="h-10 mb-4 rounded border pl-2" defaultValue="">
                    <option value="" disabled>Provincia</option>
                    {provinces.map((province, index) => (
                        <option key={index} value={province}>{province}</option>
                    ))}
                </select>}

            {!signupFormActive
                ?
                <div className="grid">
                    <button className="bg-stone-800 mb-4 text-white font-bold h-12 rounded" type="submit" name="login" >
                        {sessionState.isLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Iniciar Sesión"}
                    </button>
                    <a className="text-sm text-white"> Olvidaste la contraseña? </a>
                </div>
                :
                <div className="grid">
                    <button className="bg-blue-800 mb-4 text-white font-bold h-12 rounded" type="submit" name="signup">
                        {sessionState.isLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : "Registrarse"}
                    </button>

                    <div>
                        {user_name_Exist || user_email_Exist || user_id_Exist || pw_mismatch
                            ?
                            (
                                <div className="grid text-wrap text-white whitespace-normal text-xs text-left">
                                    {user_name_Exist && <div>🚨 Este alias ya esta en uso, por favor elija otro.</div>}
                                    {user_id_Exist && <div>🚨 Este telefono ya esta en uso, por favor elija otro.</div>}
                                    {user_email_Exist && <div>🚨 Este correo ya esta en uso, por favor elija otro.</div>}
                                    {pw_mismatch && <div>🚨 Las contraseñas no coinciden!</div>}
                                </div>
                            )
                            :
                            (
                                <div className="grid text-wrap text-xs whitespace-normal text-white text-center">
                                    {formInput
                                        ? <div>ℹ️ Todos los campos son obligatorios!</div>
                                        : <div>ℹ️ Su información personal como nombre, apellido, entre otros, se podra configurar una vez registrado.</div>}
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </form>
    )
}

const signupFormStyle0 = "rounded border pl-2 transition-all ease-in-out duration-300";
const signupFormStyle1 = `${signupFormStyle0} h-0 mb-0 opacity-0`;
const signupFormStyle2 = `${signupFormStyle0} h-10 mb-4 opacity-1`;

{/* <div className="text-wrap text-white whitespace-normal text-xs"><FontAwesomeIcon icon={faTriangleExclamation} className="text-base text-red-500 fa-bounce" /> Este alias ya esta en uso, por favor elija otro.</div> */ }
// Remember that React uses a different syntax for handling forms, so you may also want to use state and an onChange event handler if you need to manage the state of the dropdown in a React component. If you are not using React, please clarify the 