import { INote } from './note.model';

export interface ISection {
    name: string;
    notes: INote[];
}