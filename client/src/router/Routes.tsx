import App from '../App';
import Home from '../pages/Home';
import ViewListing from '../pages/ViewListing';
import NewListing from '../pages/NewListing';

import { createBrowserRouter} from 'react-router-dom';
import ForTest from '../pages/ForTest';

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
                path: '/listing/:listingid',
                element: <ViewListing/>,
            },
        ]
    },
    {
        path: '/listing/new',
        element: <NewListing/>,
    },
    {
        path: '/test',
        element: <ForTest/>,
    },

]);