import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { login } from "../state/store/slice/sessionSlice";


export default function LoginForm() {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "", });

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

    return (
        <div >
            <form className="grid" onSubmit={handleSubmit}>
                <input className="mb-1 h-10" type="text" name="email" placeholder="Email" onChange={handleChange} />
                <input className="mb-1 h-10" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="bg-stone-800 text-lume-100 font-extrabold h-10" type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}
