import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderRadius: 20,
        backgroundColor: alpha("#F5F5F5", 0.75),
        "&:hover": {
          backgroundColor: alpha("#E0E0E0", 0.75),
        },
        padding: "8px 16px",
        width: "100%",
      }}
    >
      <SearchIcon />
      <InputBase
        placeholder="Search for music..."
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
};

export default SearchBar;
