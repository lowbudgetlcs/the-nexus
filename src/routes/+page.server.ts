import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { hash } from '$lib/server/users';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './hashSchema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('AuthorizationToken', {
			path: '/'
		});

		throw redirect(302, '/login');
	},
	hash: async (e) => {
		const form = await superValidate(e, zod(formSchema));
		if (!form.valid) fail(400, { form });

		const res = await hash(form.data.password);
		if (res.type === 'error') return setError(form, 'password', 'Failed to hash password.');
		return message(form, res.data);
	}
} satisfies Actions;
