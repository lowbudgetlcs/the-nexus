export type Player = {
  name: string;
  team: string | null;
  division: string | null;
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
