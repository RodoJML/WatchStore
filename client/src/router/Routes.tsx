import { createBrowserRouter } from 'react-router-dom';

import Listings from '../pages/Listings';
import App from '../App';
import Home from '../pages/Home';

export const router = createBrowserRouter([
    {path: '/', element: <App/>},
    {path: '/listings', element: <Listings/>},
    {path: '/home', element: <Home/>},
]);