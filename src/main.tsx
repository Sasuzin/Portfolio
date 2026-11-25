import { createRoot } from 'react-dom/client';
import App from './App';
import { DEFAULT_MODE, applyTheme } from './lib/theme';
import './styles.css';

applyTheme(DEFAULT_MODE);

createRoot(document.getElementById('root')!).render(<App />);
