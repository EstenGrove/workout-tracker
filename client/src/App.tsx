import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import WorkoutsPage from "./pages/WorkoutsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
	return (
		<Router>
			<div className="App">
				<div className="App_main">
					<Routes>
						<Route path="/login" element={<div>Login Page</div>} />

						<Route path="/" element={<AppLayout />}>
							<Route index element={<Dashboard />} />
							<Route path="workouts" element={<WorkoutsPage />} />
							<Route path="history" element={<HistoryPage />} />
							<Route path="settings" element={<SettingsPage />} />
						</Route>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
