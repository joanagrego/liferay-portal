/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import Nav from '@clayui/nav';
import {memo, useState} from 'react';

import './index.scss';

const NavSegment = ({items, onSelect, selectedIndex}: any) => {
	const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);

	const handleOnClick = (index: number) => {
		if (index !== currentIndex) {
			setCurrentIndex(index);

			if (selectedIndex !== undefined) {
				onSelect(index);

				return;
			}

			onSelect(items[index]);
		}
	};

	const getNavItems = () =>
		items?.map((item: any, index: number) => (
			<Nav.Item
				className="border mkt-nav-item"
				key={`${item.key}-${index}`}
				onClick={() => handleOnClick(index)}
			>
				<Nav.Link
					active={index === selectedIndex}
					className="mkt-nav-link text-neutral-10"
				>
					{item.label}
				</Nav.Link>
			</Nav.Item>
		));

	return <Nav className="nav-segment">{getNavItems()}</Nav>;
};

export default memo(NavSegment);
