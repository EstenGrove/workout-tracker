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
import ActiveWorkoutPage from "./pages/ActiveWorkoutPage";
import DemoPage from "./pages/DemoPage";
import MedicationSettingsPage from "./pages/MedicationSettingsPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import MedicationLogsView from "./views/MedicationLogsView";
import WorkoutWeekPage from "./pages/WorkoutWeekPage";
import WorkoutGoalsPage from "./pages/WorkoutGoalsPage";
import WorkoutSettingsPage from "./pages/WorkoutSettingsPage";
import WorkoutPlansView from "./views/WorkoutPlansView";
import WorkoutSettings from "./views/WorkoutSettings";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<div className="App_main">
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/demo" element={<DemoPage />} />
							<Route
								path="workouts/active/:id?"
								element={<ActiveWorkoutPage />}
							/>
							<Route path="workouts/goals" element={<WorkoutGoalsPage />} />

							{/* MEDICATION-SPECIFIC ROUTES */}
							<Route path="meds/:id" element={<MedicationDetailsPage />}>
								<Route path="logs" element={<MedicationLogsView />} />
							</Route>

							<Route path="/" element={<AppLayout />}>
								<Route index element={<Dashboard />} />
								<Route path="recent" element={<AllRecentActivity />} />
								<Route path="workouts" element={<WorkoutWeekPage />} />
								<Route
									path="workouts/settings"
									element={<WorkoutSettingsPage />}
								>
									<Route path="" element={<WorkoutSettings />} />
									<Route path="plans" element={<WorkoutPlansView />} />
								</Route>
								<Route path="workouts/list" element={<WorkoutsPage />} />
								<Route
									path="workouts/list/:id"
									element={<WorkoutDetailsPage />}
								/>
								<Route path="history" element={<HistoryPage />} />
								<Route path="profile/health" element={<UserPage />} />
								<Route path="details" element={<DetailsPage />} />
								<Route path="meds" element={<MedicationsPage />}>
									<Route path="settings" element={<MedicationSettingsPage />} />
								</Route>
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
