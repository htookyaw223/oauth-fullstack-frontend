// import './App.css';
import { ConfigProvider, theme } from 'antd';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './context/RouteGuard';
import LoginPage from './page/login';
import PageLayout from './page/PageLayout';
import ApplicationListPage from './page/application';
import AppCreate from './page/application/create';
import { store } from './reduxtoolkit/store';

const domain = import.meta.env.VITE_APP_DOMAIN;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const isDarkMode = false;

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{ redirect_uri: window.location.origin+"/application" }}
        >
          <Router>
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Route */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<PageLayout />} >
                  <Route path="/application" element={<AppCreate />} />
                  <Route path="/credit-analyst" element={<ApplicationListPage />} />
                </Route>
              </Route>

              {/* Redirect all unknown routes */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </Auth0Provider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
