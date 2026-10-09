import './styles.css';
import { mountApplication } from './application';
const host = document.getElementById('appRoot');
if (!host) throw new Error('主界面宿主缺失');
mountApplication(host);
export { peachHistory } from '../history';
export { popCount } from '../ui-kit';
export { showToast } from './application-residents';
export { applyTheme } from '../appearance';
