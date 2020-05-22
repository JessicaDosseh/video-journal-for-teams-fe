import React, { useEffect } from "react";
import { Layout } from "antd";
import DashboardHeader from "./DashboardHeader";
import DashboardNav from "./DashboardNav";
import { fetchUserOrganizations } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const { Content } = Layout;

const NavAndHeader = (props) => {
	console.log("proppies", props);

	const { userId, fetchUserOrganizations, selectedOrganization, ...rest } = props;
	console.log(rest, "rest");

	useEffect(() => {
		fetchUserOrganizations(userId);
	}, [selectedOrganization]);

	return (
		<Layout className="nav-header">
			<DashboardNav {...rest} />
			<Content>
				<DashboardHeader />
				{props.children}
			</Content>
		</Layout>
	);
};

// export default NavAndHeader;

const mapStateToProps = (state) => ({
	userId: state.User.userId,
	organizations: state.User.organizations,
	defaultOrganization: state.User.defaultOrganization,
	selectedOrganization: state.User.selectedOrganization,
});
const mapActionsToProps = {
	fetchUserOrganizations,
};
export default connect(mapStateToProps, mapActionsToProps)(NavAndHeader);
