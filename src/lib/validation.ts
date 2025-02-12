import { z } from 'zod';

export const summonerName = z.string().min(3).max(30).includes('#');
export const teamName = z.string().min(1).max(80);
export const divisionName = z.string().min(3).max(20);
export const multi = z.string().url();
