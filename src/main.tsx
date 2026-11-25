import { createRoot } from 'react-dom/client';
import App from './App';
import { LangProvider } from './i18n';
import { DEFAULT_MODE, applyTheme } from './lib/theme';
import './styles.css';

applyTheme(DEFAULT_MODE);

createRoot(document.getElementById('root')!).render(
  <LangProvider>
    <App />
  </LangProvider>,
);
