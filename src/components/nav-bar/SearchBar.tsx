import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onHandleKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (searchRef.current && searchRef.current.value.trim() !== "") {
          navigate(`/search?key=${searchRef.current.value}`);
        }
      }
    },
    [navigate],
  );

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
      }}
    >
      <SearchIcon />
      <InputBase
        inputRef={searchRef}
        placeholder="Search for music..."
        inputProps={{ "aria-label": "search" }}
        sx={{ width: "100%" }}
        onKeyDown={onHandleKey}
      />
    </Box>
  );
};

export default SearchBar;