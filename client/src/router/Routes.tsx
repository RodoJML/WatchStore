import { createBrowserRouter } from 'react-router-dom';

import Listings from '../pages/Listings';

export const router = createBrowserRouter([{
    path: '/',
    element: <Listings/>,
}]);