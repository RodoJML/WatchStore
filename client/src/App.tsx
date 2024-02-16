import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux';
import { RootState } from './state/store/store';
import Notification from './components/Notification';
import Footer from './components/footer';

function App() {

  const sessionState = useSelector((state: RootState) => state.session);
  const listingState = useSelector((state: RootState) => state.listings);

  return (
    <div>
      <Notification message={sessionState.notification} />

      <Navbar />

      <Outlet />

      {!listingState.hasMore && <Footer />}

    </div>
  )
}

export default App



