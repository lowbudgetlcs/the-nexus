export const prerender = false;
import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import { env } from '$env/dynamic/private';
import type { Result } from '$lib/types/result';

const rAPI = () => {
  return new RiotAPI(env.RIOT_API_TOKEN);
};
/**
 *
 * @param gameName First half of a riot ID
 * @param tagLine Second half of a riot ID
 * @returns A result containing the associated account data object.
 */
export async function fetchAccountByRiotId(
  gameName: string,
  tagLine: string,
): Promise<Result<RiotAPITypes.Account.AccountDTO>> {
  try {
    const account = await rAPI().account.getByRiotId({
      region: PlatformId.AMERICAS,
      gameName,
      tagLine,
    });
    return { type: 'success', data: account };
  } catch (e) {
    return { type: 'error', reason: `Account '${gameName}#${tagLine}' not found.` };
  }
}
