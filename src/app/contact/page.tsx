"use client";
import React, { useState } from "react";
import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@mui/material/styles";
import { contactFormSchema, ContactFormData } from "@/lib/schemas";
import axios from "axios";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const contactDetails = [
  {
    icon: <EmailIcon sx={{ color: "secondary.main", fontSize: 24 }} />,
    title: "Email",
    value: "kiviamarakoon@gmail.com",
    href: "mailto:kiviamarakoon@gmail.com",
  },
  {
    icon: <PhoneIcon sx={{ color: "secondary.main", fontSize: 24 }} />,
    title: "Phone",
    value: "+94 71 932 0164",
    href: "tel:+94719320164",
  },
  {
    icon: <LocationOnIcon sx={{ color: "secondary.main", fontSize: 24 }} />,
    title: "Location",
    value: "Colombo, Sri Lanka",
  },
];

const socialLinks = [
  {
    title: "GitHub",
    href: "https://github.com/kivi98",
    icon: <GitHubIcon fontSize="medium" />,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/kivi-amarakoon-543a84195",
    icon: <LinkedInIcon fontSize="medium" />,
  },
];

const inputSx = {
  "& .MuiInputBase-root": {
    borderRadius: "14px",
    backdropFilter: "blur(8px)",
  },
};

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const cardSx = {
    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "20px",
    boxShadow: "none",
    transition: "all 0.3s ease",
  };

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
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

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
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
      <PageHero
        eyebrow="Contact"
        title="Let's work together"
        subtitle="Ready to collaborate on your next project? Whether you have a question, want to discuss an idea, or just want to say hello — my inbox is always open."
      />

      <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
        {/* Contact information */}
        <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
          <Reveal>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, letterSpacing: "-0.01em" }}
            >
              Let&apos;s Connect
            </Typography>
          </Reveal>

          <Stack spacing={2.5}>
            {contactDetails.map((detail, index) => {
              const card = (
                <Card
                  sx={{
                    ...cardSx,
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {detail.icon}
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {detail.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {detail.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              );
              return (
                <Reveal key={detail.title} delay={index * 0.1}>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                {socialLinks.map((social) => (
                  <Tooltip key={social.title} title={social.title}>
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.title}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "14px",
                        color: "text.secondary",
                        border: `1px solid ${theme.palette.divider}`,
                        background: isDark
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(255,255,255,0.7)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "text.primary",
                          transform: "translateY(-3px)",
                          borderColor: isDark
                            ? "rgba(255,255,255,0.25)"
                            : "rgba(0,0,0,0.25)",
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Reveal>
          </Stack>
        </Box>

        {/* Contact form */}
        <Box sx={{ width: { xs: "100%", lg: "60%" } }}>
          <Reveal delay={0.15}>
            <Card sx={{ ...cardSx, p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3, letterSpacing: "-0.01em" }}
              >
                Send a Message
              </Typography>
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
                      sx={inputSx}
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
                      sx={inputSx}
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
                    sx={inputSx}
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
                    sx={inputSx}
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
                        py: 1.4,
                        borderRadius: "50px",
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Card>
          </Reveal>
        </Box>
      </Stack>

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
