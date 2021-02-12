import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const handler = NextAuth(
  // @ts-ignore Types are coming https://github.com/nextauthjs/next-auth/pull/1223/files
  {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
      }),
    ],
  },
  {}
);

export default handler;
