import { ITeamDetails } from './team-details.model';

export interface ITeamData {
    teams: ITeamDetails[];
    defaultTeam: number;
}
