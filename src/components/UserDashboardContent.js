import React from 'react';
import TeamList from './TeamList';
import { Layout, Icon, Tooltip, Avatar } from 'antd';

import UserVideos from "./UserVideos"

const { Header, Content } = Layout;

function UserDashboardContent() {

	return (
		<Layout>
			{/* user dash content area */}
			<Header className="userDashHeader">
				<div className="userDashContentHeader">
					<Tooltip placement="left" title="username here">
						{/* change src below for image */}
						<Avatar size="large" icon="user" src="" />
					</Tooltip>
				</div>
			</Header>
			<Content className="userDashMain"	>
				<h1>Hi Welcome User</h1>
				<p>Put main content/components for user dashboard content here...</p>
				<TeamList />
				<UserVideos />
			</Content>
		</Layout>
	)
}

export default UserDashboardContent
