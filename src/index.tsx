import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { PublicClientApplication, InteractionType } from '@azure/msal-browser'
import { MsalProvider, MsalAuthenticationTemplate } from '@azure/msal-react'
import { PUBLIC_URL } from './utils/environment'
import { msalConfig } from './utils/authentication/authConfig'
import { AppGuard } from './utils/authentication/AppGuard'
import Loading from './components/Loading/Loading'
import './index.scss'

const msalInstance = new PublicClientApplication(msalConfig)

ReactDOM.render(
  <BrowserRouter basename={PUBLIC_URL}>
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        loadingComponent={Loading}
      >
        <AppGuard />
      </MsalAuthenticationTemplate>
    </MsalProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
