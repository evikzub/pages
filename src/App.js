import AppRouter from 'router/AppRouter';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import './styles/App.css';
import productsReducer from './pages/Storage/module/productsSlice';

const store = configureStore({
	reducer: {
		products: productsReducer, 
	},
});

function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}

export default App;
