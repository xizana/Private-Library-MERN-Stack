import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { BooksContextProvider } from './context/bookContext';
import { RecomendationsContextProvider } from './context/recomendationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecomendationsContextProvider>
      <AuthContextProvider>
        <BooksContextProvider>
          <App />
        </BooksContextProvider>
      </AuthContextProvider>
    </RecomendationsContextProvider>
  </React.StrictMode>
);
