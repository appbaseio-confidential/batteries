import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import Flex from '../../../shared/Flex';

const main = css`
	height: 113px;
	width: 220px;
	background-color: rgba(229, 230, 233, 0.21);
	border-top: 2px solid #00f68e;
	margin-bottom: 20px;
	margin-right: 20px;
`;
const titleCls = css`
	height: 19px;
	color: #232e44;
	font-size: 14px;
	line-height: 19px;
	text-align: center;
`;
const countCls = css`
	height: 49px;
	color: #232e44;
	font-size: 36px;
	line-height: 49px;
	text-align: center;
`;
const SummaryCard = ({ border, title, count }) => (
	<Flex
		flexDirection="column"
		justifyContent="center"
		css={main}
		style={{
			borderTop: `2px solid ${border}`,
		}}
	>
		<span css={titleCls}>{title}</span>
		<span css={countCls}>{count}</span>
	</Flex>
);
SummaryCard.defaultProps = {
	border: '#00f68e',
	count: 0,
};
SummaryCard.propTypes = {
	border: PropTypes.string,
	title: PropTypes.string.isRequired,
	count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SummaryCard;
