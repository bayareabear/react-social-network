// Import external components refrence
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'reflect-metadata'
import 'typeface-roboto'
import registerServiceWorker from './registerServiceWorker'
import config from 'src/config'

import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { ConnectedRouter } from 'connected-react-router/immutable'

// - Actions
import * as localeActions from 'store/actions/localeActions'
import * as globalActions from 'store/actions/globalActions'

// - Import app components
import Master from 'containers/master'
// import { App } from 'components/AWS'
// App css
import './styles/app.css'

/**
 * Execute startup functionsz
 */
import './socialEngine'
import rootSaga from 'store/sagas/rootSaga'

configureStore.runSaga(rootSaga)

// Set default data
// tslint:disable-next-line:no-empty
configureStore.store.subscribe(() => { })

// - Initialize languages
configureStore.store.dispatch(globalActions.initLocale())

// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { }

const theme = createMuiTheme({
	palette: {
		primary: { main: config.theme.primaryColor },
		secondary: { main: config.theme.secondaryColor },
	},
	typography: {
		useNextVariants: true,
	},
})

const supportsHistory = 'pushState' in window.history
ReactDOM.render(
	<Provider store={configureStore.store}>
		<ConnectedRouter history={configureStore.history}>
			<MuiThemeProvider theme={theme}>
				<Master />
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app') as HTMLElement
)
registerServiceWorker()
