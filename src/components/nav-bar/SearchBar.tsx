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
        gap: 1.0,
        borderRadius: 10,
        backgroundColor: alpha("#FFFFFF", 0.1),
        padding: "0.3rem 1rem",

        width: 300,
        minWidth: 0,
      }}
    >
      <SearchIcon />
      <InputBase
        inputRef={searchRef}
        placeholder="Search for music..."
        inputProps={{ "aria-label": "search" }}
        sx={{ width: "100%", height: "80%" }}
        onKeyDown={onHandleKey}
      />
    </Box>
  );
};

export default SearchBar;
