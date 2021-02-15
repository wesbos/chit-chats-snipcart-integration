import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
// @ts-ignore
export default NextAuth(
  // @ts-ignore Types are coming https://github.com/nextauthjs/next-auth/pull/1223/files
  {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
      }),
    ],
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
  }
);
