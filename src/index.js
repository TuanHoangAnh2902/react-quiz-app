import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { store, persistor } from './redux/store';
import GlobalStyles from './components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';

import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<GlobalStyles>
			<PersistGate
				loading={null}
				persistor={persistor}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
			</PersistGate>
		</GlobalStyles>
	</Provider>,
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
