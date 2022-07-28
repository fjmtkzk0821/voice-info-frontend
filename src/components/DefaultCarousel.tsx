import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton } from "@mui/material";
import Slider from "react-slick";

import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from "react";

const DefaultCarousel: React.FC = ({
    children
}) => {
    const [sliderRef, setSliderRef] = useState<Slider|null>(null)

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
      };

    return (
      <Card
        sx={{
          position: "relative",
          height: "256px",
          maxHeight: "256px",
        }}
      >
        <Slider ref={setSliderRef} {...settings} arrows={false}>
          {children}
        </Slider>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            right: 0,
          }}
        >
          <CardActions
            sx={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, rgba(0,0,0,.6),rgba(0,0,0,.9))",
            }}
          >
            <Box flex={1} />
            <IconButton onClick={sliderRef?.slickPrev}>
              <ArrowLeft sx={{ color: "white.main" }} />
            </IconButton>
            <IconButton onClick={sliderRef?.slickNext}>
              <ArrowRight sx={{ color: "white.main" }} />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    );
}

export default DefaultCarousel