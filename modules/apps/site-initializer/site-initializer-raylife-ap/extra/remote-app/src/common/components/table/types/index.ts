/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {ActionObject} from '../../settings-button';

export type TableSortType = {
	[keys: string]: boolean;
};

export type TableRowContentType = {[keys: string]: string};

export type TableHeadersType = {
	bold?: boolean;
	centered?: boolean;
	clickable?: boolean;
	clickableSort?: boolean;
	greyColor?: boolean;
	hasSort?: boolean;
	icon?: boolean;
	key: string;
	redColor?: boolean;
	requestLabel: string;
	type?: string;
	value: string;
};

export type TableProps = {
	actions: ActionObject[];
	data: {[keys: string]: string}[];
	headers: TableHeadersType[];
	onClickRules?: (
		item: TableHeadersType,
		rowContent: TableRowContentType
	) => void;
	onSaveCurrent?: (item: string) => void;
	setSort?: (item: TableSortType) => void;
	setSortByOrder?: (item: string) => void;
	sort?: TableSortType;
	sortByOrder?: string;
	valuer?: string;
};

export enum Order {
	Ascendant = 'asc',
	Descendant = 'desc',
}
