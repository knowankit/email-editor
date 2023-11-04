import { useState } from "react";
import Dialog from "@/lib/ui/model";
import Unsplash from "@/lib/ui/unsplash";
import { Button, Box } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import Tooltip from "@mui/material/Tooltip";
import useInternetConnectionStatus from "@/hooks/useInternetConnectionStatus";
interface IUnsplashModel {
  field: string;
  handleImageChange: (data: any) => void;
}

const UnsplashModel = ({ handleImageChange, field }: IUnsplashModel) => {
  const [isOpen, setOpen] = useState(false);
  const [isConnected] = useInternetConnectionStatus();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const getTitle = () => {
    if (isConnected) return "Unsplash gallery";

    return "You are not connected to the internet";
  };

  return (
    <>
      <Tooltip title={getTitle()} placement="top" arrow>
        <Box component="div" display="flex">
          <Button
            disabled={!isConnected}
            startIcon={<CollectionsIcon />}
            onClick={handleClick}
          >
            Gallery
          </Button>
        </Box>
      </Tooltip>
      <Dialog isOpen={isOpen} handleClick={handleClick} title="Image Gallery">
        <Unsplash
          handleImageChange={data => handleImageChange(data)}
          field={field}
          setOpen={setOpen}
        />
      </Dialog>
    </>
  );
};

export default UnsplashModel;
