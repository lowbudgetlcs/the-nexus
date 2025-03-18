export type User = {
  id: number;
  username: string;
  password: string;
};

export type Player = {
  name: string;
  team: string | null;
  division: string | null;
  puuid: string;
};

export type Team = {
  name: string;
  division: string | null;
  playerCount: number;
};

export type Division = {
  name: string;
  teamCount: number;
};
