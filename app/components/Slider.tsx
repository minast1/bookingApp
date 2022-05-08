import React from "react";
import { Carousel } from "react-responsive-carousel";
import { NoSsr, useMediaQuery, useTheme } from "@mui/material";

const Slider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <NoSsr>
      <Carousel dynamicHeight={false} infiniteLoop showThumbs={false} autoPlay>
        <div>
          <img
            src="/u2.jpg"
            alt=""
            style={{ height: isMobile ? 200 : 350, objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="/u5.jpg"
            alt=""
            style={{ height: isMobile ? 200 : 350, objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="/u4.jpg"
            alt=""
            style={{ height: isMobile ? 200 : 350, objectFit: "cover" }}
          />
        </div>
      </Carousel>
    </NoSsr>
  );
};

export default Slider;
