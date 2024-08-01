import NextAuth from 'next-auth';
import { authOptions } from '@//auth';

const handler = NextAuth(authOptions) as unknown;
export { handler as GET, handler as POST };
