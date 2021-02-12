import { providers, signIn } from 'next-auth/client';
import { Providers } from 'next-auth/providers';

type SignInProps = {
  providers: Providers;
};

export default function SignIn({ providers: availableProviders }: SignInProps) {
  return (
    <div>
      <p>hey</p>
      {Object.values(availableProviders).map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

SignIn.getInitialProps = async () => ({
  providers: await providers(),
});
