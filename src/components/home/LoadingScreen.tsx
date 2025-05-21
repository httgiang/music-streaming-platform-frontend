import CircularProgress from "@mui/material/CircularProgress";
const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingScreen;
