import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="627219743521-9b07gis2ofadi4nbj23sv24epe1k5o29.apps.googleusercontent.com">
  <App />
  </GoogleOAuthProvider>
  
)
