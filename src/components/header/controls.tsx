import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import OnlineOfflineStatus from "@/components/header/online-offline-status";
import IntroButton from "@/components/button-controls/intro-button";
import GithubAuth from "@/components/button-controls/github-auth";
import {
  GitHubRepoStarButton,
  GithubFollowButton
} from "@/components/button-controls/github-buttons";

const Controls = () => {
  return (
    <Box mb={"1rem"} display="flex" justifyContent="space-between">
      <Box display="flex">
        <IntroButton />
        <GithubAuth />
      </Box>

      <Link
        component="a"
        fontSize="0.875rem"
        href="https://github.com/knowankit/email-editor"
        sx={{
          textTransform: "none",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          color: "black"
        }}
      >
        <GithubFollowButton />
        <GitHubRepoStarButton />
        <GitHubIcon />
        <OnlineOfflineStatus />
      </Link>
    </Box>
  );
};

export default Controls;
