import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";

export default function LoginForm() {

    const [loginFormData, setLoginFormData] = useState({ email: "", password: "", });
    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // e comes from the event listener, a default behavior of react
        // event listener is the submit button

        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle form field changes and update the state
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="bg-amber-400" type="submit">Login</button>
            </form>
        </div>
    )
}
