import type { Actions } from '@sveltejs/kit';

import { createAlert } from '$lib/server/services/alert';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const level = parseInt(formData.get('name') as string);
		const originID = formData.get('originID') as string;
		const description = formData.get('description') as string;

		try {
			await createAlert({ data: { name, level, originID, description } });

			return {
				success: true,
				status: 'Form is submitted'
			};
		} catch (error) {
			console.log(error);

			return {
				error
			};
		}
	}
};
