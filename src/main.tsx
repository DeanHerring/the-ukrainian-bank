import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StyledEngineProvider>,
);

{
  /* <StyledEngineProvider injectFirst>
<ThemeProvider theme={theme}>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
</ThemeProvider>
</StyledEngineProvider>, */
}
