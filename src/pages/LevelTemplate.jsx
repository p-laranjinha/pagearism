import * as React from "react";
import Split from "react-split";
import "./LevelTemplate.css";
import {
  Tabs,
  Tab,
  Box,
  AppBar,
  IconButton,
  Fab,
  Toolbar,
  Modal,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimerIcon from "@mui/icons-material/Timer";
import EditIcon from "@mui/icons-material/Edit";

function LevelTemplate({
  cssComponent,
  htmlComponent,
  helpComponent,
  targetComponent,
  successFunction,
  edits,
  stopwatch,
  trophy,
  completed,
}) {
  const navigate = useNavigate();
  const [exitModalOpen, setExitModalOpen] = React.useState(false);

  const onKeyDown = (event) => {
    if (event.key === "Escape" && !exitModalOpen) {
      setExitModalOpen(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Split
        className="split"
        sizes={[75, 25]}
        minSize={0}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={5}
        dragInterval={1}
      >
        <LeftSide
          cssComponent={cssComponent}
          htmlComponent={htmlComponent}
          helpComponent={helpComponent}
          successFunction={successFunction}
          navigate={navigate}
          edits={edits}
          stopwatch={stopwatch}
          trophy={trophy}
          completed={completed}
        />
        <div style={{ backgroundColor: "white", minWidth: 40 }}>
          {targetComponent}
        </div>
      </Split>
      <ExitModal
        open={exitModalOpen}
        setOpen={setExitModalOpen}
        exitConfirm={() => navigate("/levels/")}
      />
    </>
  );
}

function LeftSide({
  cssComponent,
  htmlComponent,
  helpComponent,
  successFunction,
  navigate,
  edits,
  stopwatch,
  trophy,
  completed,
}) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [submitModalOpen, setSubmitModalOpen] = React.useState(false);
  const [helpModalOpen, setHelpModalOpen] = React.useState(true);

  const [solutionMessage, setSolutionMessage] = React.useState("");
  const [solutionModalOpen, setSolutionModalOpen] = React.useState(false);

  const handleActiveTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  React.useEffect(() => {
    if (!helpModalOpen && stopwatch && !stopwatch.isRunning) stopwatch.start();
  }, [helpModalOpen]);

  const submitConfirm = () => {
    if (successFunction()) {
      switch (trophy) {
        case "gold":
          setSolutionMessage(
            "Your solution is correct! And you got a gold trophy! Excelent!"
          );
          break;
        case "silver":
          setSolutionMessage(
            "Your solution is correct! And you got a silver trophy! Good job!"
          );
          break;
        case "chocolate":
          setSolutionMessage(
            "Your solution is correct! And you got a bronze trophy!"
          );
          break;
        case "black":
          setSolutionMessage(
            "Your solution is correct! But you didn't get a trophy."
          );
          break;
        default:
          setSolutionMessage("Your solution is correct!");
          break;
      }
    } else {
      setSolutionMessage("Your solution is wrong. Keep trying!");
    }
    setSolutionModalOpen(true);
    setSubmitModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 320 }}>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Tabs value={activeTab} onChange={handleActiveTabChange}>
          <Tab
            icon={<CssIcon fontSize="large" />}
            aria-label="CSS"
            sx={{ "&:not(.Mui-selected)": { color: "grey" } }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<HtmlIcon fontSize="large" />}
            aria-label="HTML"
            sx={{ "&:not(.Mui-selected)": { color: "grey" } }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <Box style={{ flexGrow: 1 }}>
        <TabPanel
          value={activeTab}
          index={0}
          style={{ height: "100%", overflow: "auto" }}
        >
          {cssComponent}
        </TabPanel>
        <TabPanel
          value={activeTab}
          index={1}
          style={{ height: "100%", overflow: "auto" }}
        >
          {htmlComponent}
        </TabPanel>
      </Box>
      <AppBar
        position="relative"
        sx={{ top: "auto", bottom: 0, backgroundColor: "rgba(0, 0, 0, 1)" }}
      >
        {trophy ? (
          <Toolbar variant="dense" sx={{ justifyContent: "center" }}>
            <EmojiEventsIcon htmlColor={trophy} />
            {stopwatch ? (
              <div style={{ display: "flex" }}>
                <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
                <Typography>
                  {stopwatch.hours.toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  })}
                  :
                  {stopwatch.minutes.toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  })}
                  :
                  {stopwatch.seconds.toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  })}
                </Typography>
                <TimerIcon sx={{ marginLeft: 0.5 }} />
              </div>
            ) : (
              <></>
            )}
            {edits != null ? (
              <div style={{ display: "flex" }}>
                <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
                <Typography>{edits < 0 ? 0 : edits}</Typography>
                <EditIcon sx={{ marginLeft: 0.5 }} />
              </div>
            ) : (
              <></>
            )}
          </Toolbar>
        ) : (
          <></>
        )}
        <Toolbar variant="regular" sx={{ justifyContent: "center" }}>
          <IconButton
            color="inherit"
            sx={{ position: "absolute", left: 10 }}
            onClick={() => setHelpModalOpen(true)}
          >
            <QuestionMarkIcon />
          </IconButton>
          <Fab
            color="success"
            variant="extended"
            onClick={() => {
              if (completed) {
                setSolutionMessage("Do you want to exit the level?");
                setSolutionModalOpen(true);
              } else setSubmitModalOpen(true);
            }}
          >
            <AssignmentTurnedInIcon sx={{ mr: 1 }} />
            Submit Solution
          </Fab>
        </Toolbar>
      </AppBar>
      <SubmitModal
        open={submitModalOpen}
        setOpen={setSubmitModalOpen}
        submitConfirm={submitConfirm}
      />
      <HelpModal
        open={helpModalOpen}
        setOpen={setHelpModalOpen}
        content={helpComponent}
      />
      <SolutionModal
        open={solutionModalOpen}
        setOpen={setSolutionModalOpen}
        content={solutionMessage}
        exitConfirm={() => navigate("/levels/")}
      />
    </div>
  );
}

function HelpModal({ content, open, setOpen }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
          About this level:
        </Typography>
        {content}
      </Box>
    </Modal>
  );
}

function SubmitModal({ open, setOpen, submitConfirm }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
          Are you sure you want to submit this solution?
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
          <Button variant="contained" color="success" onClick={submitConfirm}>
            Yes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

function ExitModal({ open, setOpen, exitConfirm }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
          Are you sure you want to exit this level? Your current solution will
          not be saved!
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
          <Button variant="contained" color="success" onClick={exitConfirm}>
            Yes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

function SolutionModal({ open, setOpen, content, exitConfirm }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
          {content}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button variant="contained" onClick={exitConfirm}>
            Exit
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Stay
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default LevelTemplate;
