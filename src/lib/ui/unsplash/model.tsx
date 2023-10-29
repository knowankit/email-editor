import { useState } from "react";
import Dialog from "@/lib/ui/model";
import Unsplash from "@/lib/ui/unsplash";
import { Button } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";

interface IUnsplashModel {
  field: string;
  handleImageChange: (data: any) => void;
}

const UnsplashModel = ({ handleImageChange, field }: IUnsplashModel) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <Button startIcon={<CollectionsIcon />} onClick={handleClick}>
        Gallery
      </Button>
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
