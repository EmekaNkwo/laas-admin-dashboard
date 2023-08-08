import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import DashboardLayout from "./layouts/Dashboard";

import { Dashboard, Setting, TwoFA, User, Users } from "./pages";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>

			<Route path='/' element={<Navigate to='login' replace />} />
			<Route path="login" element={<Login />} />
			<Route path="2fa" element={<TwoFA />} />
			<Route path="" element={<ProtectedRoutes />}>
				<Route path="dashboard" element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='users' element={<Users />} />
					<Route path='users/:id' element={<User />} />
					<Route path='settings' element={<Setting />} />
				</Route>
			</Route>
		</>
	)
);

