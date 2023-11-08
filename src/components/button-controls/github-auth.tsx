import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import handleGitHubSignIn from "@/lib/auth/github";
import { useSession, signOut } from "next-auth/react";

const GithubAuth = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <Button
        color="secondary"
        size="small"
        onClick={() => handleGitHubSignIn()}
        startIcon={<GitHubIcon />}
        sx={{ textTransform: "none", mr: "1rem", color: "black" }}
      >
        Login
      </Button>
    );
  }

  const logout = () => {
    signOut();
  };

  const { user } = session;
  const { name } = user as any;

  return (
    <Button
      size="small"
      startIcon={<GitHubIcon />}
      onClick={logout}
      sx={{ textTransform: "none", mr: "1rem", color: "black" }}
    >
      {name} - Logout
    </Button>
  );
};

export default GithubAuth;
