import React from "react";
import { connect } from "react-redux";
import { Card, Icon } from 'antd';
import { Link } from "react-router-dom";

const TeamCard = props => {
	return (
		<Link to={`/teams/${props.data.id}`}>
			<Card className="teamCard" size="small">
				<Icon type="ellipsis" />
				<div>
					<p>{props.data.name}</p>
					<p className="small">{props.data.description}</p>
					{props.data.role_id === 2 ? <Icon type="team" /> : null}
				</div>
			</Card>
		</Link>
	);
};

const mapStateToProps = state => {
	return {
		isUpdating: state.isUpdating
	};
};
export default connect(mapStateToProps, {})(TeamCard);