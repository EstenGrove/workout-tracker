import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import WorkoutsPage from "./pages/WorkoutsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";
import DetailsPage from "./pages/DetailsPage";
import AllRecentActivity from "./pages/AllRecentActivity";
import LoginPage from "./pages/LoginPage";
import MedicationsPage from "./pages/MedicationsPage";
import MedicationDetailsPage from "./pages/MedicationDetailsPage";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<div className="App_main">
						<Routes>
							<Route path="/login" element={<LoginPage />} />

							<Route path="/" element={<AppLayout />}>
								<Route index element={<Dashboard />} />
								<Route path="recent" element={<AllRecentActivity />} />
								<Route path="workouts" element={<WorkoutsPage />} />
								<Route path="history" element={<HistoryPage />} />
								<Route path="profile" element={<UserPage />} />
								<Route path="details" element={<DetailsPage />} />
								<Route path="meds" element={<MedicationsPage />} />
								<Route
									path="meds/details"
									element={<MedicationDetailsPage />}
								/>
								<Route path="settings" element={<SettingsPage />} />
							</Route>
						</Routes>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
