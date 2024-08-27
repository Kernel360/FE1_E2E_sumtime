/* eslint-disable no-param-reassign */
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { and, eq, sql } from 'drizzle-orm';
import { db, schema } from '@/db';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { title: 'email', type: 'email', placeholder: 'please enter email' },
        password: { title: 'password', type: 'password' },
      },
      // @ts-expect-error -> authorize ts error 해결을 위한 코드. 참고: https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('please enter the email and password');
        }

        const user = db
          .select({
            id: schema.usersTable.id,
            email: schema.usersTable.email,
            name: schema.usersTable.nickname,
          })
          .from(schema.usersTable)
          .where(
            and(
              eq(schema.usersTable.email, sql.placeholder('email')),
              eq(schema.usersTable.password, sql.placeholder('password')),
            ),
          )
          .prepare();

        try {
          const userData = await user.execute({ email: credentials.email, password: credentials.password });
          if (userData.length > 0) {
            return userData[0];
          }
          throw new Error('no user info');
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log('jwt callback tet', { token, user, trigger, session });

      if (trigger === 'update' && session?.user.name) {
        try {
          const userId = Number(session.user.id);

          // DB에서 사용자 정보를 업데이트합니다.
          await db
            .update(schema.usersTable)
            .set({
              nickname: session.user.name,
            })
            .where(eq(schema.usersTable.id, userId))
            .execute();

          // DB에서 업데이트된 사용자 정보를 가져옵니다.
          const userFromDb = await db
            .select({
              name: schema.usersTable.nickname,
            })
            .from(schema.usersTable)
            .where(eq(schema.usersTable.id, userId))
            .execute();

          if (userFromDb.length > 0) {
            const { name } = userFromDb[0];
            console.log('jwt callback userFromDb userFromDb[0]--=====', userFromDb[0]);
            console.log('jwt callback userFromDb { name }=====', { name });
            console.log('jwt callback userFromDb name =====', name);
            token.name = name; // 토큰에 사용자 이름을 업데이트합니다.
          }
        } catch (error) {
          console.error('Error updating or fetching user from database:', error);
        }
      }

      // token.name = session.user.name;
      console.log('jwt callback sessionnnnnnn with Trigger db 바뀐걸로====================', session);
      console.log('jwt callback Tokkkkkken with Trigger db 바뀐걸로====================', token);

      if (user) {
        console.log('jwt callback userrrrrrr', user);
        return {
          ...token,
          name: user.name,
          email: user.email,
          id: user.id,
          // user,
        };
      }
      console.log('jwt callback tokenn with Trigger ====================', token);
      return token;
    },

    async session({ session, token }) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          name: token.name || session.user.name,
          email: token.email || session.user.email,
          id: token.id || session.user.id,
        },
      };

      console.log('session callback sessionnnnnnn====================', session);
      return updatedSession;
    },
  },
};
