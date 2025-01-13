import { Outlet } from "react-router-dom";
import Layout, { useSidebar } from "../../components/Layout";
import { Navbar } from "../../components/Navbar";


const IndexDashboard = () => {
	const context = useSidebar();

	return (
		<Layout>
			<Navbar sidebar={context?.sidebar} setSidebar={context?.setSidebar} />
			<Outlet />
		</Layout>
	)
}

export default IndexDashboard;