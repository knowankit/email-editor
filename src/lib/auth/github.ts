import { signIn } from "next-auth/react";

const handleGitHubSignIn = () => {
  signIn("github");
};

export default handleGitHubSignIn;
