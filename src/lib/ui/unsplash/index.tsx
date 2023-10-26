import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import { Box, Button, TextField } from "@mui/material";

interface IUnsplash {
  field: string;
  handleImageChange: (data: any) => void;
  setOpen: (val: boolean) => void;
}

const Unsplash = ({ handleImageChange, field, setOpen }: IUnsplash) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API || ""
  });

  useEffect(() => {
    async function fetchImages() {
      await findImages();
    }

    fetchImages();
  }, []);

  const findImages = async (value = "nature") => {
    setIsLoading(true);
    const images: any = await unsplash.search.getPhotos({
      query: value || "nature",
      page: currentPage,
      perPage: 10,
      orientation: "landscape"
    });

    setImages(images.response.results);
    setIsLoading(false);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    const imagesSet: any = await unsplash.search.getPhotos({
      query: value || "nature",
      page: currentPage + 1,
      perPage: 10,
      orientation: "landscape"
    });

    setCurrentPage(currentPage + 1);

    const response = imagesSet.response.results;

    const sumAllImages = images.concat(response);
    setImages(sumAllImages);

    setIsLoading(false);
  };

  const handleImageClick = async (imageURL: string) => {
    const data = {
      type: field,
      value: imageURL
    };

    handleImageChange(data);
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <TextField
          type="text"
          size="small"
          placeholder="Search Photos"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          size="small"
          disabled={!value}
          variant="contained"
          sx={{ ml: 1, textTransform: "none" }}
          onClick={() => findImages(value)}
        >
          Search
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        marginTop="20px"
        height="460px"
        overflow="scroll"
        justifyContent="center"
      >
        {images.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                backgroundImage: `url('${item.urls.small}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                mr: "10px",
                mb: "10px"
              }}
              height="150px"
              width="150px"
              // href={item.urls.small}
              onClick={() => handleImageClick(item.urls.regular)}
            />
          );
        })}
      </Box>
      {images.length && (
        <Box display="flex" justifyContent="center" mt="20px">
          <Button
            onClick={loadMoreImages}
            variant="contained"
            color="secondary"
            sx={{ textTransform: "none" }}
            size="small"
            // isLoading={isLoading}
            // loadingText="Loading Images..."
          >
            Load more
          </Button>
        </Box>
      )}
    </>
  );
};

export default Unsplash;
