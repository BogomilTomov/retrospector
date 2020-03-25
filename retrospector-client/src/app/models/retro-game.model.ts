import { ITeam } from './team.model';
import { INote } from './note.model';

export interface IRetroGame {
    id: number | null
    notesCount: number | null;
    creationDate: Date | null;
    lastModified: Date | null;
    name: string;
    template: string;
    url: string | null;
    teamId: number | null;
    team: ITeam | null;
    notes: INote[] | null;
}