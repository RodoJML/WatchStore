import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { login } from "../state/store/slice/sessionSlice";
import { AuthenticationEnvelope, DataEnvelope } from "../model/fetch";
import { PayloadAction } from "@reduxjs/toolkit";

interface LoginFormProps {
    onSignInClose: () => (void);
}

export default function LoginForm({ onSignInClose }: LoginFormProps) {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "", });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // e comes from the event listener, a default behavior of react
        // event listener is the submit button
        dispatch(login(loginFormData)).then((res: any) => {
            console.log("Login successful of user: " + res.payload.email);
            onSignInClose()
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle form field changes and update the state
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    return (
        <form className="grid row-span-3" onSubmit={handleSubmit}>

            <div className="grid">
                <div className="flex text-white text-3xl">
                    <span className="font-bold">⌚️Watch</span>
                    <span className="font-light">Store</span>
                </div>

                <span className="text-sm mb-6 text-left text-white">
                    Inicia sesión o <a className="text-white underline" href="/">crea una cuenta nueva</a>
                </span>
                

                <input className="h-10 mb-4 rounded border pl-2" type="text" name="email" placeholder="Correo" onChange={handleChange} />
                <input className="h-10 mb-4 rounded pl-2" type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                <button className="bg-stone-800 mb-4 text-white font-bold h-12 rounded" type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
                <a className="text-sm text-white" href="/"> Olvidaste la contraseña? </a>

            </div>

        </form>
    )
}
