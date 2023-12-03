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
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "12px",
          textTransform: "none",
          boxShadow: "none",
        },
        text: {
          paddingInline: 0,
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  },
});
