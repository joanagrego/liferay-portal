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

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';
import {useEffect, useState} from 'react';

import Header from '../../../common/components/header';
import Table from '../../../common/components/table';
import {getPolicies} from '../../../common/services';
import formatDate from '../../../common/utils/dateFormatter';

const HEADERS = [
	{
		greyColor: true,
		key: 'boundDate',
		value: 'Bound Date',
	},
	{
		key: 'productName',
		value: 'Product',
	},
	{
		bold: true,
		clickable: true,
		key: 'externalReferenceCode',
		type: 'link',
		value: 'Policy Number',
	},
	{
		greyColor: true,
		key: 'policyOwnerName',
		value: 'Name',
	},
	{
		greyColor: true,
		key: 'termPremium',
		value: 'Monthly Premium',
	},
	{
		greyColor: true,
		key: 'boundDate',
		value: 'Policy Period',
	},
	{
		greyColor: true,
		key: 'commission',
		value: 'Commission',
	},
];

const PARAMETERS = {
	page: '0',
	pageSize: '0',
	sort: 'boundDate:desc',
};

type Policy = {
	boundDate: Date;
	commission: number;
	externalReferenceCode: string;
	policyOwnerName: string;
	productName: string;
	termPremium: number;
};

type TableContent = {[keys: string]: string};

const PoliciesTable = () => {
	const [policies, setPolicies] = useState<TableContent[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(5);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [firstPaginationLabel, setFirstPaginationLabel] = useState<number>(1);
	const [secondPaginationLabel, setSecondPaginationLabel] = useState<number>(
		1
	);

	PARAMETERS.pageSize = pageSize.toString();
	PARAMETERS.page = page.toString();

	const handleDeletePolicy = (externalReferenceCode: string) => {
		alert(`Delete ${externalReferenceCode} Action`);
	};

	const handleEditPolicy = (externalReferenceCode: string) => {
		alert(`Edit ${externalReferenceCode} Action`);
	};

	useEffect(() => {
		getPolicies(PARAMETERS).then((results) => {
			const policiesList: TableContent[] = [];
			results?.data?.items.forEach(
				({
					boundDate,
					commission,
					externalReferenceCode,
					policyOwnerName,
					productName,
					termPremium,
				}: Policy) => {
					policiesList.push({
						boundDate: formatDate(new Date(boundDate), true),
						commission: commission.toString(),
						externalReferenceCode,
						key: externalReferenceCode,
						policyOwnerName,
						productName,
						termPremium: termPremium.toString(),
					});
				}
			);
			setPolicies(policiesList);

			const totalCount = results?.data?.totalCount;
			setTotalCount(totalCount);

			const totalPages = Math.ceil(totalCount / pageSize);
			setTotalPages(totalPages);

			const firstPaginationLabel = (page - 1) * pageSize + 1;
			setFirstPaginationLabel(firstPaginationLabel);

			const secondPaginationLabel =
				totalCount > page * pageSize ? page * pageSize : totalCount;
			setSecondPaginationLabel(secondPaginationLabel);
		});
	}, [pageSize, page]);

	const title = `Joana (${totalCount})`;

	return (
		<div className="px-3 ray-dashboard-recent-policies">
			<Header className="mb-5 pt-3" title={title} />

			<Table
				actions={[
					{
						action: handleEditPolicy,
						value: 'Edit',
					},
					{
						action: handleDeletePolicy,
						value: 'Delete',
					},
				]}
				data={policies}
				headers={HEADERS}
			/>

			<div className="d-flex justify-content-between mt-3">
				<ClayPaginationBar>
					<ClayPaginationBar.DropDown
						items={[
							{
								label: '5',
								onClick: () => {
									setPageSize(5);
									setPage(1);
								},
							},
							{
								label: '10',
								onClick: () => {
									setPageSize(10);
									setPage(1);
								},
							},
							{
								label: '20',
								onClick: () => {
									setPageSize(20);
									setPage(1);
								},
							},
							{
								label: '30',
								onClick: () => {
									setPageSize(30);
									setPage(1);
								},
							},
							{
								href: '#3',
								label: '50',
								onClick: () => {
									setPageSize(50);
									setPage(1);
								},
							},
							{
								label: '75',
								onClick: () => {
									setPageSize(75);
									setPage(1);
								},
							},
						]}
						trigger={
							<ClayButton displayType="unstyled">
								{pageSize}
								&nbsp;Entries
								<ClayIcon symbol="caret-double-l" />
							</ClayButton>
						}
					/>

					<ClayPaginationBar.Results>
						Showing {firstPaginationLabel}
						&nbsp;to&nbsp;
						{secondPaginationLabel} of {totalCount} entries.
					</ClayPaginationBar.Results>
				</ClayPaginationBar>

				<ClayPaginationWithBasicItems
					activePage={page}
					ellipsisBuffer={2}
					onPageChange={(page: number) => setPage(page)}
					totalPages={totalPages}
				/>
			</div>
		</div>
	);
};

export default PoliciesTable;
