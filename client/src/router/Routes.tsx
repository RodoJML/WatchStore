import App from '../App';
import Home from '../pages/Home';
import { createBrowserRouter} from 'react-router-dom';
import Brands from '../components/Brands';

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
                path: '/brands',
                element: <Brands/>,
            },
        ]
    }
]);