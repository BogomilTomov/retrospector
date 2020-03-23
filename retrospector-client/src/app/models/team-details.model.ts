import { IRetroGame } from './retro-game.model';

export interface ITeamDetails {
    id: number
    name: string;
    creationDate: Date;
    retroGames: IRetroGame[];
    ownerId: string;
}
