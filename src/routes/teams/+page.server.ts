import type { Actions, PageServerLoad } from '../$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { createTeamSchema } from './components/create-team/schema';
import { removeDivisionSchema } from './components/remove-division/schema';
import { changeDivisionSchema } from './components/change-division/schema';
import { checkTeamExists, readAllTeams, createTeam } from '$lib/server/teams';
import { checkDivisionExists } from '$lib/server/divisions';
import { createPlayer } from '$lib/server/players';
import type { Team } from '$lib/types/models';
import { parseMulti, Success } from '$lib/utils';

export const load: PageServerLoad = async () => {
  const teamList: Team[] = [];
  const teams = await readAllTeams();
  if (Success(teams)) return { teams: teams.unwrap() }
  return { teams: [] }

  const promisesRemoveDivision = teamList.map((_, id) => {
    return superValidate(zod(removeDivisionSchema), { id: `${id}` });
  });

  const promisesChangeDivision = teamList.map((_, id) => {
    return superValidate(zod(changeDivisionSchema), { id: `${id}` });
  });

  return {
    teams: teamList,
    createTeamForm: await superValidate(zod(createTeamSchema)),
    removeDivisionForms: await Promise.all(promisesRemoveDivision),
    changeDivisionForms: await Promise.all(promisesChangeDivision),
  };
};

export const actions = {
  create: async (e) => {
    const form = await superValidate(e, zod(createTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { name, divisionName, multi, logo } = form.data;
    // Check that team doesnt exist
    const teamExists = await checkTeamExists(name);
    if (!Success(teamExists)) return setError(form, 'name', teamExists.err);
    if (teamExists.unwrap()) return setError(form, 'name', `Team '${name}' already exists.`);
    // Check that division exists
    if (divisionName) {
      const divisionExists = await checkDivisionExists(divisionName);
      if (!Success(divisionExists)) return setError(form, 'divisionName', divisionExists.err);
      if (!divisionExists.unwrap())
        return setError(form, 'divisionName', `Division '${divisionName}' doesn't exist.`);
    }
    // Parse multi link
    const summoners = parseMulti(multi);
    // Create team
    const res = await createTeam(name, divisionName, logo);
    if (!Success(res)) return setError(form, 'name', res.err);
    // Create players
    const createPromises = summoners.map((p) => createPlayer(p, name));
    const createErrors = (await Promise.all(createPromises))
      .filter((res) => !Success(res))
      // @ts-expect-error Type narrowing performed in previous filter check
      .map((res) => res.err);
    if (createErrors.length > 0) return setError(form, 'multi', createErrors);
    return message(form, `Successfully created '${name}' with ${createPromises.length} players!`);
  },
  removeDivision: async (e) => {
    const form = await superValidate(e, zod(removeDivisionSchema));
    if (!form.valid) return fail(400, { form });
    return message(form, 'Not yet implemented.');
  },
  changeDivision: async (e) => {
    const form = await superValidate(e, zod(changeDivisionSchema));
    if (!form.valid) return fail(400, { form });
    return message(form, 'Not yet implemented.');
  },
} satisfies Actions;
