import { signOutAction } from "@/actions";

import { Button } from "./button";

const SignOut = () => {
  return (
    <form
      action={async () => {
        await signOutAction();
      }}
    >
      <Button type="submit">로그아웃</Button>
    </form>
  );
};

export default SignOut;
