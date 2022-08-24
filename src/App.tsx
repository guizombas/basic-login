import AuthContextProvider from './context/authContext';
import Router from './routes';
import './assets/styles/global.css';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
