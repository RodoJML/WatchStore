import App from '../App';
import Home from '../pages/Home';
import { createBrowserRouter} from 'react-router-dom';
import Brands from '../components/Brands';
import Login from '../pages/Login';
import Listings from '../pages/Listings';

export const router = createBrowserRouter([
    {
        path: '/', 
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: '/login',
                element: <Login />,
            
            },
            {
                path: '/brands',
                element: <Brands/>,
            },
            {
                path: '/listings',
                element: <Listings/>,
            }

        ]
    }
]);