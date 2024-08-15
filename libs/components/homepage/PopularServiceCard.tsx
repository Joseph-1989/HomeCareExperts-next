import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Service } from '../../types/service/service';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topServiceRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface PopularServiceCardProps {
	service: Service;
}

const PopularServiceCard = (props: PopularServiceCardProps) => {
	const { service } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	const pushDetailHandler = async (serviceId: string) => {
		console.log('serviceId:', serviceId);
		await router.push({ pathname: '/service/detail', query: { id: serviceId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${service?.serviceImages[0]})` }}
					onClick={() => {
						pushDetailHandler(service?._id); // push to detail page
					}}
				>
					{service && service?.serviceRank >= topServiceRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${service.servicePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(service?._id); // push to detail page
						}}
					>
						{service.serviceTitle}
					</strong>
					<p className={'desc'}>{service.serviceLocation}</p>
					<div className={'options'}>
						<div>
							<span>{service?.serviceCategory.replace(/_/g, ' ')}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{service?.serviceStatus}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{service?.serviceViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${service?.serviceImages[0]})` }}
					onClick={() => {
						pushDetailHandler(service?._id); // push to detail page
					}}
				>
					{service && service?.serviceRank >= topServiceRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${service.servicePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(service?._id); // push to detail page
						}}
					>
						{service.serviceTitle}
					</strong>
					<p className={'desc'}>{service.serviceLocation}</p>
					<div className={'options'}>
						<div>
							<span>{service?.serviceCategory.replace(/_/g, ' ')}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{service?.serviceStatus}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{service?.serviceViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularServiceCard;
