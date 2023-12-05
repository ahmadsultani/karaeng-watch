import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#EAC35F",
    },
    secondary: {
      main: "#222222",
    },
    info: {
      main: "#306BEC",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
      styleOverrides: {
        root: {
          borderColor: "secondary.main",
          "& input": {
            color: "secondary.main",
            padding: "12px 8px",
          },

          "& label:not(.MuiInputLabel-shrink)": {
            marginLeft: "8px",
            marginTop: "8px",
          },

          "& .MuiSelect-select": {
            padding: "12px 0px",
          },
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "medium",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
          boxShadow: "none",
        },
        sizeLarge: {
          padding: "16px 24px",
          fontSize: "16px",
        },
        sizeMedium: {
          padding: "12px 20px",
          fontSize: "14px",
        },
        sizeSmall: {
          padding: "8px 16px",
          fontSize: "12px",
        },
        text: {
          paddingInline: "0 !important",
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },

    MuiTypography: {
      defaultProps: {
        fontSize: "inherit",
      },
    },
  },
});
