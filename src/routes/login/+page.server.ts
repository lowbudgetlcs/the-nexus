import { loginUser } from "$lib/server/users";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
  const user = locals.user;

  if (user) {
    throw redirect(302, "/");
  }
};

export const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");
    if (!username || !password) {
      return fail(400, {
        error: "Missing username or password.",
      });
    }

    const res = await loginUser(username.toString(), password.toString());

    if (res.type === 'error') {
      return fail(401, { error: "Failed to authenticate."});
    }

    cookies.set("AuthorizationToken", `Bearer ${res.data}`, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    throw redirect(302, "/");
  },
} satisfies Actions;