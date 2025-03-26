import type { Medication } from '$lib/types/medication';

// export interface ISchedule {
// 	medication: IMedication;
// 	times: string[];
// }

export enum ScheduleType {
	AsNeeded,
	Once,
	Daily,
	Weekly,
	Monthly,
	Custom,
}

export type DailyAmount = number | 'AsNeeded' | 'Continuous';

export interface ISchedule {
	type: ScheduleType;
	frequency?: number;
	medication: Medication;
	times: Date[];
	dailyAmount: DailyAmount;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	sizeOfContainer: number;
	amountRemaining: number;
}
