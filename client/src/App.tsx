import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux';
import { RootState } from './state/store/store';
import Notification from './components/Notification';

function App() {

  const sessionState = useSelector((state: RootState) => state.session);
  
  return (
    <div>
      <Notification message={sessionState.notification} />

      <Navbar />

        <Outlet/>

    </div>
  )
}

export default App



