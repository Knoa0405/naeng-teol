import { signInWithGoogle } from "@/actions";

const SignIn = () => {
  return (
    <form
      action={async () => {
        await signInWithGoogle();
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
};

export { SignIn };
