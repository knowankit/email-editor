import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Link from "@mui/material/Link";
import StarIcon from "@mui/icons-material/Star";

export const GithubFollowButton = () => {
  return (
    <Link
      color="secondary"
      href="https://github.com/knowankit"
      component="a"
      fontSize="0.875rem"
      target="_blank"
      sx={{
        textTransform: "none",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        mr: "1rem",
        color: "black"
      }}
    >
      <PersonAddIcon sx={{ mr: "0.5rem" }} /> Follow
    </Link>
  );
};

export const GitHubRepoStarButton = () => {
  return (
    <Link
      color="secondary"
      href="https://github.com/knowankit/email-editor"
      component="a"
      fontSize="0.875rem"
      target="_blank"
      sx={{
        textTransform: "none",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        mr: "1rem",
        color: "black"
      }}
    >
      <StarIcon sx={{ mr: "0.5rem" }} /> Star
    </Link>
  );
};
