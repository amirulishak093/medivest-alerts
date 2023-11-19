import type { Prisma } from '@prisma/client';
import { db } from '../db';

// Create a new alert.
// Parameters:
// - data: The data for creating a new alert.
export async function createAlert({ data }: Prisma.AlertCreateArgs) {
	try {
		if (data.originID) {
			// If originID is provided, check for an existing alert.
			const existingAlert = await db.alert.findFirst({
				where: { originID: data.originID }
			});

			if (existingAlert) {
				// If it exists, update only the createdAt field to the current date.
				const updatedAlert = await db.alert.update({
					where: { id: existingAlert.id },
					data: { createdAt: new Date() }
				});

				// Return the updated alert.
				return updatedAlert;
			}
		}

		// If originID is not provided, create a new alert with the provided data.
		const newAlert = await db.alert.create({
			data
		});

		// Return the newly created alert.
		return newAlert;
	} catch (error) {
		console.error('Error creating or updating alert', error);
		throw new Error('Failed to create or update alert');
	}
}

// // Retrieve alerts based on specified criteria.
// // Parameters:
// // - orderBy: Optional sorting criteria.
// // - where: Optional filtering criteria.
// // - take: Optional number of records to retrieve.
// // - skip: Optional number of records to skip.
export async function getAlerts({
	orderBy = {},
	where = {},
	take = undefined,
	skip = undefined
}: Prisma.AlertFindManyArgs = {}) {
	try {
		// Fetch alerts with the provided parameters.
		const alerts = await db.alert.findMany({
			orderBy,
			where,
			take,
			skip
		});

		// Return the retrieved alerts.
		return alerts;
	} catch (error) {
		console.error('Error fetching alerts', error);
		throw new Error('Failed to fetch alerts');
	}
}
