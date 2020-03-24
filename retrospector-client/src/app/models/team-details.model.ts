import { IRetroGame } from './retro-game.model';

export interface ITeamDetails {
    id: number | null
    name: string | null;
    creationDate: Date | null;
    retroGames: IRetroGame[] | null;
    ownerId: string | null;
}
