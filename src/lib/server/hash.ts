import argon2 from 'argon2';

async function hash(password: string) {
	try {
		const hash = await argon2.hash(password);
		return hash;
	} catch (error) {
		console.error('Error hashing password:\n', error);
	}
}
