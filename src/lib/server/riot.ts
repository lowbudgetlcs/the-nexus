import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import { env } from '$env/dynamic/private';
import type { Result } from '$lib/types/result';

const riot = new RiotAPI(env.RIOT_API_TOKEN);
export async function fetchAccountByRiotId(
  gameName: string,
  tagLine: string,
): Promise<Result<RiotAPITypes.Account.AccountDTO>> {
  try {
    const account = await riot.account.getByRiotId({
      region: PlatformId.AMERICAS,
      gameName,
      tagLine,
    });
    return { type: 'success', data: account };
  } catch (e) {
    return { type: 'error', reason: `Account '${gameName}#${tagLine}' not found.` };
  }
}
