import LogInSuggestionDialog from "./home/LogInSuggestionDialog";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [open, setOpen] = useState(true);

  if (!user) {
    return (
      <LogInSuggestionDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
