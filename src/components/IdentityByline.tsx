import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface IdentityBylineProps {
  /** Mono role label under the name. */
  role?: string;
  /** Square edge length of the portrait, in px. */
  size?: number;
}

/**
 * Editorial byline: the portrait as a squared plate beside the serif name and
 * a mono role label. Used wherever a page needs to put a face to the writing —
 * the About opener and the contact column.
 */
const IdentityByline: React.FC<IdentityBylineProps> = ({
  role = "Software Engineer",
  size = 56,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Avatar
      src="/my-images/kivi-avatar.webp"
      alt="Kivi Amarakoon"
      variant="square"
      sx={{
        width: size,
        height: size,
        borderRadius: "3px",
        backgroundColor: "background.default",
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    />
    <Box>
      <Typography variant="h6" sx={{ fontSize: "1.05rem", fontWeight: 500 }}>
        Kivi Amarakoon
      </Typography>
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", display: "block", mt: 0.25 }}
      >
        {role}
      </Typography>
    </Box>
  </Box>
);

export default IdentityByline;
