import { Button } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import GitHubIcon from "@mui/icons-material/GitHub";
import handleGitHubSignIn from "@/lib/auth/github";
import { useSession } from "next-auth/react";

const GithubAuth = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={() => handleGitHubSignIn()}
        startIcon={<PlayCircleFilledWhiteIcon />}
        sx={{ textTransform: "none", mr: "1rem" }}
      >
        Git login test
      </Button>
    );
  }

  const logout = () => {
    console.log("");
  };

  const { user } = session;
  const { name } = user as any;

  return (
    <Button
      size="small"
      onClick={logout}
      startIcon={<PlayCircleFilledWhiteIcon />}
      sx={{ textTransform: "none", mr: "1rem" }}
    >
      {name}
    </Button>
  );
};

export default GithubAuth;
