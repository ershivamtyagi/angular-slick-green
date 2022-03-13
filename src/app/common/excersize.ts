import { ExcersizeHistory } from './excersize-history';

export class Excersize {
	id: number;
	name: string;
	mainMuscleGrp: string;
	sets: ExcersizeHistory[];
	regim: string;
	excersize: any;
	excersizeDescription:string;
	type:string;
	equipment:string;
	level:string;
	sport:string;
	force:string;
	variations:string;
	mechanicsType:string;
	otherMuscleGrp:string;
}