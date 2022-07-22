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

 import { Loader } from '@googlemaps/js-api-loader';

const googleMapsLoader = new Loader({
	apiKey: "XXX",
	libraries: ["places"]
  });

  googleMapsLoader
  .load()
  .then((google) => {
	const input = document.getElementById("place") as HTMLInputElement;

	new google.maps.places.Autocomplete(input, {
			componentRestrictions: {country: 'us'},
			fields: ['address_components'],
	});

  })
  .catch(error => {
	// eslint-disable-next-line no-console
    console.log(error);
  });

const Test = () => (
	<div>
		<h1>Solutions Google Places</h1>

		<input id='place' />
	</div>
);

export default Test;
