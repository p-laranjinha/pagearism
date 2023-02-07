import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Frontpage from "./pages/Frontpage";
import Levels from "./pages/Levels";
import Settings from "./pages/Settings";
import { Fab, Modal, Box, Typography } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Level0_1 from "./pages/levels/Level0_1";
import Level0 from "./pages/levels/Level0";
import Level1 from "./pages/levels/Level1";
import Level2 from "./pages/levels/Level2";
import Level3 from "./pages/levels/Level3";

function App() {
  const levels = [
    // {
    //   path: "/levels/0-1/",
    //   name: "Test Level",
    //   storageKey: "level0.1",
    //   element: <Level0_1 storageKey="level0.1" />,
    // },
    {
      path: "/levels/0/",
      name: "Level 0 (Hello World!)",
      storageKey: "level0",
      element: <Level0 storageKey="level0" />,
    },
    {
      path: "/levels/1/",
      name: "Level 1 (Square)",
      storageKey: "level1",
      element: <Level1 storageKey="level1" />,
    },
    {
      path: "/levels/2/",
      name: "Level 2 (Aligning)",
      storageKey: "level2",
      element: <Level2 storageKey="level2" />,
    },
    {
      path: "/levels/3/",
      name: "Level 3 (calc)",
      storageKey: "level3",
      element: <Level3 storageKey="level3" />,
    },
  ];

  const router = createBrowserRouter([
    { path: "/", element: <Frontpage /> },
    { path: "/settings/", element: <Settings /> },
    { path: "/levels/", element: <Levels levels={levels} /> },
    ...levels,
  ]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>
          <Fab
            size="large"
            color="primary"
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setModalOpen(true)}
          >
            <QuestionMarkIcon />
          </Fab>
          <RouterProvider router={router} />

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 450,
                bgcolor: "#242424",
                border: "2px solid rgba(0,0,0,0.4)",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                About the game:
              </Typography>
              <Typography align="center" style={{ marginTop: 10 }}>
                Pagearism is collection of levels where the player has to fix
                code to display the correct output.
              </Typography>
              <Typography align="center" style={{ marginTop: 10 }}>
                There are levels that either time or keep count of the edits of
                the player. You can see if a level is one of these by seeing if
                the time or the count is above the submit button (unless you
                disable it in the Settings).
              </Typography>

              <Typography align="center" style={{ marginTop: 10 }}>
                To exit a level you can either press ESC or go back to the
                previous page. But your progress will not be saved.
              </Typography>
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
