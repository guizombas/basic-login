import AuthContextProvider from './context/authContext';
import Router from './routes';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
