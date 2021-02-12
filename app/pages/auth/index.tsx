import { providers, signIn, signOut, useSession } from 'next-auth/client';

export default function SignIn({ providers }) {
  const [session, loading] = useSession();
  return (
    <div>
      <p>hey</p>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

SignIn.getInitialProps = async (context) => ({
  providers: await providers(context),
});
