import React from "react";
import { Grid, Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <>
      <Skeleton width="100vw" height="150px" />
      <Skeleton width="100vw" height="80px" />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" height="70vh" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rectangular" height="70vh" />
        </Grid>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" height="70vh" />
        </Grid>
      </Grid>
    </>
  );
};

export default SkeletonLoader;
