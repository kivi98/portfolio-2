import React from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Link from "next/link";
import AvatarCard from "@/components/AvatarCard";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 4, md: 8 } }}
    >
      <Box sx={{ height: { xs: "100%", md: "calc(100vh - 218px)" } }}>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={4}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ mt: { xs: "1rem", md: 0 }, mb: { xs: "1.5rem", md: 0 } }}
            >
              <AvatarCard />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                padding: { xs: "0 1rem", md: "0 0" },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Hi there,
                <br />
                Welcome to my portfolio
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "secondary.light",
                  width: { xs: "100%", md: "50%" },
                  height: 2,
                  my: 2,
                  boxShadow: "0px 0px 12px #E30000",
                  borderRadius: 10,
                }}
              />
              <Typography variant="body1" sx={{ color: "text.primary", mb: 2 }}>
                👋 I'm Kivi Amarakoon, a software enthusiast dedicated to
                crafting user-friendly apps, optimizing algorithms, and solving
                complex problems. I'm passionate about continuous learning,
                exploring new technologies, and embracing the digital
                revolution. Join me in building the future, one line of code at
                a time.
                <br />
                <br />
                Let's create, innovate, and inspire together!
              </Typography>
              <Link href="/about">
                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "text.light",
                    width: { xs: "100%", md: "10rem" },
                    height: { xs: "2.5rem", md: "3rem" },
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "secondary.light",
                    },
                  }}
                  endIcon={<DoubleArrowIcon />}
                >
                  About Me
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
