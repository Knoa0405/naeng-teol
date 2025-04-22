import Image from "next/image";

import { signInWithGoogle } from "@/actions";

import { Button } from "./button";
// TODO: 나중에 내 서버에 있는 이미지로 바꿔야 함
const PROVIDER_LOGO_PATH = "https://authjs.dev/img/providers";

const SignIn = () => {
  return (
    <form
      action={async () => {
        await signInWithGoogle();
      }}
    >
      <Button type="submit" variant="outline" className="gap-2">
        <Image
          src={`${PROVIDER_LOGO_PATH}/google.svg`}
          alt="google logo"
          width={16}
          height={16}
        />
        구글 로그인
      </Button>
    </form>
  );
};

export default SignIn;
