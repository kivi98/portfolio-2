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
import EmailIcon from "@mui/icons-material/Email";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: { xs: "110px", md: "130px" },
        pb: { xs: 4, md: 6 },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={{ xs: 3, md: 4 }}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <AvatarCard />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
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
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
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
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: "wrap",
                }}
              >
                <Link href="/about">
                  <Button
                    sx={{
                      backgroundColor: "secondary.main",
                      color: "text.light",
                      minWidth: { xs: "100%", sm: "10rem" },
                      height: { xs: "2.5rem", md: "3rem" },
                      borderRadius: "1rem",
                      boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.46)",
                      fontWeight: 700,
                      "&:hover": {
                        backgroundColor: "secondary.light",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 4px 14px rgba(227, 0, 0, 0.6)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    endIcon={<DoubleArrowIcon />}
                  >
                    About Me
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "rgba(227, 0, 0, 0.05)",
                      color: "text.light",
                      minWidth: { xs: "100%", sm: "10rem" },
                      height: { xs: "2.5rem", md: "3rem" },
                      borderRadius: "1rem",
                      boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.18)",
                      border: "1px solid rgba(227, 0, 0, 0.32)",
                      fontWeight: 700,
                      "&:hover": {
                        backgroundColor: "rgba(227, 0, 0, 0.77)",
                        border: "1px solid rgba(227, 0, 0, 0.77)",
                        boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.8)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    endIcon={<EmailIcon />}
                  >
                    Contact Me
                  </Button>
                </Link>
                {/* <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(227, 0, 0, 0.05)",
                    color: "text.light",
                    minWidth: { xs: "100%", sm: "12rem" },
                    height: { xs: "2.5rem", md: "3rem" },
                    borderRadius: "1rem",
                    boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.18)",
                    border: "1px solid rgba(227, 0, 0, 0.32)",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "rgba(227, 0, 0, 0.77)",
                      border: "1px solid rgba(227, 0, 0, 0.77)",
                      boxShadow: "0px 0px 10px rgba(227, 0, 0, 0.8)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  endIcon={<DownloadIcon />}
                >
                  Download CV
                </Button> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
