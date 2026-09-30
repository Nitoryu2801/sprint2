export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'QA_SPECIALIST' | 'SUPERVISOR';
  token?: string;
}

export interface LoginResource {
  email: string;
  password: string;
}
