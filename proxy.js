import { updateSession } from './lib/supabase/middleware.js';

export async function proxy(request) {
  return updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.svg|favicon.svg).*)'],
};
