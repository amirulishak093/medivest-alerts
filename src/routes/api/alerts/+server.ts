import { json } from '@sveltejs/kit';
import { createAlert, getAlerts } from '$lib/server/services/alert';
import type { RequestEvent } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export async function POST(event: RequestEvent) {
	try {
		const { name, level, description, originID } = await event.request.json();

		await createAlert({ data: { name, level, description, originID } });

		return json({ success: true });
	} catch (error) {
		console.error('Error creating alert:', error);
		return json(
			{ success: false, error: 'An error occurred while creating the alert.' },
			{ status: 500 }
		);
	}
}

export async function GET(event: RequestEvent) {
	``;
	try {
		const params = event.url.searchParams;

		const level = Number(params.get('level'));
		const take = Number(params.get('take'));
		const skip = Number(params.get('skip'));

		const options: Prisma.AlertFindManyArgs = {
			where: {
				level: level || undefined
			},
			orderBy: { createdAt: 'desc' },
			take: take || undefined,
			skip: skip || undefined
		};

		const alerts = await getAlerts(options);

		return json(alerts);
	} catch (error) {
		console.error('Error fetching alerts:', error);
		return json({ error: 'An error occurred while fetching alerts.' }, { status: 500 });
	}
}

// export async function GET(event: RequestEvent) {``
// 	try {
// 		const params = event.url.searchParams;

// 		const level = Number(params.get('level'));

// 		const options: Prisma.AlertFindManyArgs & {pageSize?: number, cursor?: string} = {
// 			where: {
// 				level: level || undefined,
// 			},
// 			orderBy: {createdAt: 'desc'},
// 		};

// 		const alerts = await getAlerts(options);

// 		return json(alerts);
// 	} catch (error) {
// 		console.error('Error fetching alerts:', error);
// 		return json({ error: 'An error occurred while fetching alerts.' }, { status: 500 });
// 	}
// }
