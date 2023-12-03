import {
  Drawer,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";

import Search from "@mui/icons-material/Search";

interface SearchDrawerProps {
  open: boolean;
  onClose: (value: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({
  open,
  onClose,
  inputRef,
}) => {
  const medium = useMediaQuery("(max-width:1024px)");

  return (
    <Drawer open={open && medium} anchor="top" onClose={onClose}>
      <TextField
        placeholder="Search"
        type="search"
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Drawer>
  );
};
