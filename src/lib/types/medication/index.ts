export enum MedicationType {
	Custom = 0,
	Tablet,
	Liquid,
	Injection,
}

export enum MedicationUnit {
	Custom = 0,
	Mg,
	Ml,
	Pill,
}

export interface Medication {
	id: string;
	name: string;
	dosage: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
}

export type MedicationUnitOrCustom = (
	| {
			unit: Omit<MedicationUnit, 'Custom'>;
			customUnit?: never;
	  }
	| {
			unit: 'Custom';
			customUnit: string;
	  }
) & {
	/** The dosage value will be divided by this number to get the decimal place. This is to prevent floating point errors and keep things accurate. */
	decimalPlace?: 1 | 10 | 100 | 1000 | 10000 | 100000;
};

export type MedicationTypeOrCustom =
	| {
			type: Omit<MedicationType, 'Custom'>;
			customType?: never;
	  }
	| {
			type: 'Custom';
			customType: string;
	  };

export type MedicationDosage = MedicationTypeOrCustom & {
	unit: MedicationUnitOrCustom;
	amount: number;
};
