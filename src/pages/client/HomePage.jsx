import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosCient from "../../utils/axiosCLient";
import ProductCard from "../../components/client/ProductCard";
import {
  Box,
  Grid,
  Heading,
  ListItem,
  Text,
  List,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getAll();
    axiosCient
      .get("/category")
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axiosCient
      .get("/banner")
      .then((response) => {
        setBanners(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getAll = () => {
    axiosCient
      .get("/product")
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="productsPageContainer">
      <Box display="flex" padding="1rem 3rem">
        <List
          sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            bgColor: "#fff",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <ListItem
            sx={{ fontSize: "1.2rem", fontWeight: "bold", padding: "1rem" }}
          >
            Danh mục sản phẩm
          </ListItem>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              sx={{
                padding: "0.7rem",
                width: "100%",
                "&:hover": {
                  bgColor: "#dddd",
                },
              }}
              as={Link}
            >
              {category.name}
            </ListItem>
          ))}
        </List>
        <Box
          width="100%"
          flex="1"
          overflow="hidden"
          padding="0 3rem"
          sx={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <Slider {...settings} autoplay={true} autoplaySpeed={true}>
            {banners.map((banner) => (
              <Box key={banner.id} width="100%">
                <Image
                  src={"http://localhost:8081/image/" + banner.imageUrl}
                  width="100%"
                  height="400px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      <Text fontSize="1.5rem" fontWeight="bold" textAlign={"center"}>Danh sách sản phẩm</Text>
      <Box padding="1rem 3rem">
        <Grid
          p="1rem"
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={8}
        >
          {products.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default HomePage;
