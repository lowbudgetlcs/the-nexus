export const prerender = false;
import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import { env } from '$env/dynamic/private';
import type { AsyncResult } from '$lib/utils';
import { Ok, Err } from '$lib/utils';

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
): AsyncResult<RiotAPITypes.Account.AccountDTO, string> {
  try {
    const account = await rAPI().account.getByRiotId({
      region: PlatformId.AMERICAS,
      gameName,
      tagLine,
    });
    return Ok(account);
  } catch (e) {
    console.error(e);
    return Err(`Account '${gameName}#${tagLine}' not found.`);
  }
}
