import './assets/css/App.css';
import './assets/css/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Stats from './components/Stats';
import Layout from './components/Layout';
import CoffeeForm from './components/CoffeeForm';
import { useAuth } from './context/AuthContext';


function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length;


  const authenticatedContent = (
    <>
      <Stats />
    </>
  );


  return (
    <Layout>
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {
        isAuthenticated && isLoading &&
        <div className="text-center mb-5">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="fw-bold">載入中...</h4>
        </div>
      }
      {
        isAuthenticated && isData && authenticatedContent
      }
    </Layout>
  )
}

export default App