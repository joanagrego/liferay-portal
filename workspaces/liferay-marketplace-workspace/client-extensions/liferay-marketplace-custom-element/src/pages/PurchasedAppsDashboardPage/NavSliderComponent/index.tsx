/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import classNames from 'classnames';
import {useState} from 'react';

import './index.scss';

enum APPTYPESPECIFICATION {
	CLOUD_APPS = 'Cloud Apps',
	DXP_APPS = 'DXP Apps',
}

interface SpecificationTypes {
	name: string;
	total: number;
}

const NavSlider = () => {
	const [active, setActive] = useState<string>(APPTYPESPECIFICATION.DXP_APPS);

	const appSpecificationType = [
		{name: APPTYPESPECIFICATION.CLOUD_APPS, total: 45},
		{name: APPTYPESPECIFICATION.DXP_APPS, total: 28},
	];

	const getNavItems = () =>
		appSpecificationType?.map(
			(appType: SpecificationTypes, index: number) => (
				<ClayButton
					className={classNames('nav-slider-button', {
						'active m-1': active === appType.name,
					})}
					displayType="secondary"
					key={index}
					onClick={() => {
						setActive(appType.name);
					}}
					size="sm"
				>
					{appType.name} {`(${appType.total})`}
				</ClayButton>
			)
		);

	return <div className="nav-bar-content">{getNavItems()}</div>;
};

export default NavSlider;
