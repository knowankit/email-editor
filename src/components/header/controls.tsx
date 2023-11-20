import { Box } from "@mui/material";
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
      <Box display="flex">
        <GithubFollowButton />
        <GitHubRepoStarButton />
        <OnlineOfflineStatus />
      </Box>
    </Box>
  );
};

export default Controls;
