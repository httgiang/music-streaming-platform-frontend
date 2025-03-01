import { Container } from "@mui/material";
import { useToast } from "@/contexts/ToastContext";

const HomePage = () => {
  const showToast = useToast();
  return (
    <Container>
      <button onClick={() => showToast("Hello", "error")}>Toast</button>
    </Container>
  );
};

export default HomePage;
