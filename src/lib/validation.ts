import { z } from 'zod';

export const summonerName = z.string().min(3).max(30).includes('#').trim();
export const teamName = z.string().min(1).max(80).trim();
export const divisionName = z.string().min(3).max(20).trim();
export const multi = z.string().url().trim();
