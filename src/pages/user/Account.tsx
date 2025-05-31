import {
  MusicNote,
  Edit,
  CreditCard,
  HelpCenter,
  Lock,
  SelfImprovement,
  PrivacyTip,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "@/theme/theme";

const Account = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: "auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
      zIndex={0}
    >
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Card
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flex: 1,
            p: 2,
          }}
        >
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography variant="h6">Your Plan</Typography>
            <Typography variant="h4" fontWeight="bold">
              Groovity Commoners
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            mb: 2,
            p: 2,
            background: theme.custom.lightGradient,
            cursor: "pointer",
          }}
        >
          <Typography variant="h5" color="black" fontWeight="bold">
            Join Nobles
          </Typography>
        </Card>
      </Box>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" textAlign="left" paddingLeft={2}>
            Account
          </Typography>
          <List>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <MusicNote />
              </ListItemIcon>
              <ListItemText primary="Manage your subscription" />
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/profile");
              }}
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Edit profile" />
            </ListItem>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <SelfImprovement />
              </ListItemIcon>
              <ListItemText primary="Ghost mode" />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" textAlign="left" paddingLeft={2}>
            Payment
          </Typography>
          <List>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText primary="Manage payment cards" />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" textAlign="left" paddingLeft={2}>
            Security and Privacy
          </Typography>
          <List>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                {" "}
                <Lock />{" "}
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItem>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <PrivacyTip />
              </ListItemIcon>
              <ListItemText primary="Account privacy" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" textAlign="left" paddingLeft={2}>
            Help
          </Typography>
          <List>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                {" "}
                <HelpCenter />{" "}
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Account;
