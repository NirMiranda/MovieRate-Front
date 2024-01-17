import ReactDOM from 'react-dom/client'
import App from './App.tsx'




const rootElement = document.getElementById('root');
rootElement && rootElement.setAttribute("style", "background-color: black; hight: 100%")


ReactDOM.createRoot(document.getElementById('root')!).render(

  <App />
)
