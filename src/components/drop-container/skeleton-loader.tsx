import Skeleton from "@mui/material/Skeleton";
import useEmailStore from "@/store/email";

const SkeletonLoader = () => {
  const { emailData } = useEmailStore();

  return emailData["children"].map((_c: any, index: number) => (
    <Skeleton
      variant="rectangular"
      width="550px"
      height="200px"
      key={index}
      sx={{ mt: 1 }}
    />
  ));
};

export default SkeletonLoader;
