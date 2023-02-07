import * as React from "react";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

function Frontpage() {
  React.useEffect(() => {
    document.title = "Pagearism";
  }, []);

  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100vw" }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        Pagearism
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ width: 200 }}
        onClick={() => navigate("levels/")}
      >
        Play
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ width: 200 }}
        onClick={() => navigate("settings/")}
      >
        Settings
      </Button>
    </Stack>
  );
}

export default Frontpage;
