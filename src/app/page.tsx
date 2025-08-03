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
import DownloadIcon from "@mui/icons-material/Download";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: { xs: "90px", md: "130px" },
        pb: { xs: "90px", md: "120px" },
      }}
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
          spacing={0}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{ mt: { xs: "1rem", md: 0 }, mb: { xs: "1.5rem", md: 0 } }}
            >
              <AvatarCard />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
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
                Hi there 👋,
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
                I&apos;m Kivi Amarakoon, a software enthusiast dedicated to
                crafting user-friendly apps, optimizing algorithms, and solving
                complex problems. I&apos;m passionate about continuous learning,
                exploring new technologies, and embracing the digital
                revolution. Join me in building the future, one line of code at
                a time.
                <br />
                <br />
                Let&apos;s create, innovate, and inspire together!
              </Typography>
              <Box sx={{ display: "flex", gap: { xs: 1.5, md: 1 }, flexDirection: { xs: "column", md: "row" } }}>
              <Link href="/about">
                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "text.light",
                    width: { xs: "100%", md: "10rem" },
                    height: { xs: "2.5rem", md: "3rem" },
                    borderRadius: "1rem",
                    boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.46)",
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
              <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(227, 0, 0, 0.05)",
                    color: "text.light",
                    width: { xs: "100%", md: "12rem" },
                    height: { xs: "2.5rem", md: "3rem" },
                    borderRadius: "1rem",
                    boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.18)",
                    border: "1px solid rgba(227, 0, 0, 0.32)",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "rgba(227, 0, 0, 0.77)",
                      border: "1px solid rgba(227, 0, 0, 0.77)",
                      boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.8)",
                    },
                  }}
                  endIcon={<DownloadIcon />}
                >
                    Download CV
                  </Button>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
