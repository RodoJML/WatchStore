import { createBrowserRouter } from 'react-router-dom';

import Listings from '../pages/Listings';
import App from '../App';
import Home from '../pages/Home';

export const router = createBrowserRouter([
    {
        path: '/', 
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/listings',
                element: <Listings/>
            },
        ]
    }
]);