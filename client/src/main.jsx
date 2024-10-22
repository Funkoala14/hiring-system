import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./global.scss";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store, { persistor } from "./store/store.js";

import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	// </StrictMode>
	//     {/* PersistGate delays rendering until rehydration is complete */}
	<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</PersistGate>
);
