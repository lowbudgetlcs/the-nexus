export enum EventStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  PAUSED = "PAUSED",
  NOT_STARTED = "NOT_STARTED",
  COMPLETE = "COMPLETE"
}

export type EventGroup = {
  id: number;
  name: string;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  group: EventGroup | null
}
