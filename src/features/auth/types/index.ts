import { authClient } from '$features/auth/client';

export type AuthData = typeof authClient.$Infer.Session;
