"use client";
import React from "react";
import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  styled,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { keyframes } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import avatar from "@/public/images/avatar-me.svg";
import { useState } from "react";
import { contactFormSchema, ContactFormData } from "@/lib/schemas";
import axios from "axios";

const iconBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  height: 50,
  width: 50,
  borderRadius: 12,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  margin: theme.spacing(0.5),
  transition: "background 0.2s",
  "&:hover": {
    animation: `${iconBounce} 1.2s`,
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
}));

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    severity: "success" | "error";
    message: string;
    open: boolean;
  }>({
    severity: "success",
    message: "",
    open: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form using Zod
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      const flattenedErrors = result.error.flatten().fieldErrors;

      (Object.keys(flattenedErrors) as Array<keyof ContactFormData>).forEach(
        (key) => {
          const messages = flattenedErrors[key];
          if (messages && messages.length > 0) {
            fieldErrors[key] = messages[0];
          }
        },
      );

      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("/api/send", formData);
      setSubmitStatus({
        open: true,
        severity: "success",
        message: "Message sent! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        open: true,
        severity: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus((prev) => ({ ...prev, open: false }));
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 8 },
        pt: { xs: "90px", md: "150px" },
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mb: 6,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <Box
            component="img"
            src={avatar.src}
            alt="Contact Illustration"
            sx={{
              height: 300,
              width: "100%",
              objectFit: "cover",
              objectPosition: "top left",
              borderRadius: 5,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              // boxShadow: (theme) =>
              //   theme.palette.mode === "dark"
              //     ? "0 8px 32px rgba(0, 0, 0, 0.3)"
              //     : "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            px: { xs: 0, md: 0 },
            justifyContent: "flex-start",
            height: { xs: "170px", md: "100%" },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              height: { xs: "auto", md: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                fontWeight: 800,
                mb: 1,
                width: "100%",
                fontSize: { xs: 32, md: 50 },
              }}
            >
              Get In Touch
            </Typography>
            <Divider
              sx={{
                backgroundColor: "secondary.light",
                height: 2,
                width: "100%",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ color: "text.primary", mt: 2, height: "100%", flexGrow: 1 }}
            >
              Ready to collaborate on your next project? I&apos;m always excited
              to hear about new opportunities and innovative ideas. Whether you
              have a question, want to discuss a potential project, or just want
              to say hello, feel free to reach out.
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Box sx={{ py: 2 }}>
        <Divider sx={{ width: "100%" }} />
      </Box>

      {/* Contact Form Section */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={4} sx={{ mt: 4 }}>
        {/* Contact Information */}
        <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: 24, md: 32 },
            }}
          >
            Let&apos;s Connect
          </Typography>

          <Stack spacing={3}>
            <a
              href="mailto:kiviamarakoon@gmail.com"
              style={{ textDecoration: "none", display: "block" }}
            >
              <Card
                sx={{
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(35, 39, 47, 0.33)"
                      : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                        : "0 8px 32px rgba(0, 0, 0, 0.1)",
                  },
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <EmailIcon
                      sx={{
                        color: "secondary.main",
                        fontSize: 24,
                      }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        kiviamarakoon@gmail.com
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </a>

            <a
              href="tel:+94719320164"
              style={{ textDecoration: "none", display: "block" }}
            >
              <Card
                sx={{
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(35, 39, 47, 0.33)"
                      : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                        : "0 8px 32px rgba(0, 0, 0, 0.1)",
                  },
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PhoneIcon
                      sx={{
                        color: "secondary.main",
                        fontSize: 24,
                      }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Phone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +94 71 932 0164
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </a>

            <Card
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <LocationOnIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 24,
                    }}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Colombo, Sri Lanka
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Contact Form */}
        <Box sx={{ width: { xs: "100%", lg: "60%" } }}>
          <Card
            sx={{
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(35, 39, 47, 0.33)"
                  : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: 3,
              p: 4,
              boxShadow: "none",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: 24, md: 32 },
              }}
            >
              Send Message
            </Typography>
            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    size="medium"
                    fullWidth
                    required
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        backdropFilter: "blur(8px)",
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    size="medium"
                    fullWidth
                    required
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: 2,
                        backdropFilter: "blur(8px)",
                      },
                    }}
                  />
                </Stack>
                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  size="medium"
                  fullWidth
                  required
                  disabled={isSubmitting}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: 2,
                      backdropFilter: "blur(8px)",
                    },
                  }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  size="medium"
                  fullWidth
                  multiline
                  rows={5}
                  required
                  disabled={isSubmitting}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: 2,
                      backdropFilter: "blur(8px)",
                    },
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={!isSubmitting && <SendIcon />}
                    disabled={isSubmitting}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 4px 12px rgba(227, 0, 0, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(227, 0, 0, 0.4)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Card>
        </Box>
      </Stack>
      {/* Social Media Section */}
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: 24, md: 32 },
          }}
        >
          Follow Me
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
        >
          Stay connected and follow my journey in technology, development, and
          innovation across various platforms.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          flexWrap="wrap"
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
          >
            <StyledIconButton
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main,
                  ),
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <FacebookIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
          >
            <StyledIconButton
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main,
                  ),
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <InstagramIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <StyledIconButton
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main,
                  ),
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <LinkedInIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <StyledIconButton
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main,
                  ),
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <GitHubIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noopener"
            aria-label="Medium"
          >
            <StyledIconButton
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main,
                  ),
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ArticleIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener" aria-label="X">
            <StyledIconButton
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.33)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main,
                  ),
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(227, 0, 0, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <XIcon fontSize="medium" />
            </StyledIconButton>
          </a>
        </Stack>
      </Box>
      <Snackbar
        open={submitStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={submitStatus.severity}
          sx={{ width: "100%" }}
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
