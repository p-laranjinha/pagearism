import { Container, Stack } from "@mui/system";
import * as React from "react";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Fab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Settings() {
  React.useEffect(() => {
    document.title = "Settings - Pagearism";
  }, []);

  const navigate = useNavigate();

  if (!localStorage.getItem("settings")) {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        display_timer_and_score: true,
      })
    );
  }

  const [settings, setSettings] = React.useState(
    JSON.parse(localStorage.getItem("settings"))
  );

  const changeSettings = (s) => {
    setSettings(s);
    localStorage.setItem("settings", JSON.stringify(s));
  };

  return (
    <Container sx={{ width: "100%", height: "100vh" }}>
      <Fab
        variant="extended"
        size="large"
        color="primary"
        sx={{ position: "absolute", top: 8, left: 8 }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        <span>Back</span>
      </Fab>
      <Stack spacing={2} alignItems="center" sx={{ height: "100vh" }}>
        <Typography variant="h2" sx={{ textAlign: "center", mt: 4 }}>
          Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.display_timer_and_score}
                onChange={(e) =>
                  changeSettings({
                    ...settings,
                    display_timer_and_score: e.target.checked,
                  })
                }
              />
            }
            label="Display timer and score in the level"
          />
        </FormGroup>
      </Stack>
    </Container>
  );
}

export default Settings;
