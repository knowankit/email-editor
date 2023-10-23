import Box from "@mui/material/Box";
import Sidebar from "@/lib/ui/sidebar";

const withSidebar = (WrappedComponent: React.FC<any>) => {
  const WithSidebar = (props: any) => {
    return (
      <Box>
        <Sidebar>
          <WrappedComponent {...props} />
        </Sidebar>
      </Box>
    );
  };

  return WithSidebar;
};

export default withSidebar;
