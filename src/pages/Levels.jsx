import { Fab } from "@mui/material";
import { Container, Stack } from "@mui/system";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CssVarsProvider } from "@mui/joy/styles";
import { Typography as JoyTypography, Divider } from "@mui/joy";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimerIcon from "@mui/icons-material/Timer";
import EditIcon from "@mui/icons-material/Edit";

function Levels({ levels }) {
  React.useEffect(() => {
    document.title = "Levels - Pagearism";
  }, []);

  const navigate = useNavigate();

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
      <Stack spacing={2} sx={{ height: "100vh" }}>
        <Typography variant="h2" sx={{ textAlign: "center", mt: 4 }}>
          Levels
        </Typography>
        {levels.map((value, index, _) => (
          <LevelCard
            key={index}
            name={value.name}
            link={value.path}
            info={JSON.parse(localStorage.getItem(value.storageKey)) || null}
          />
        ))}
      </Stack>
    </Container>
  );
}

function LevelCard({ name, link, info = null }) {
  const navigate = useNavigate();
  return (
    <CssVarsProvider defaultMode="dark">
      <Card
        row
        variant="outlined"
        sx={{
          bgcolor: "rgba(0,0,0,0.2)",
          borderColor: "rgba(256,256,256,0.2)",
          boxShadow: "0 0 0 0",
          "&:hover": {
            boxShadow: "2px 2px 5px rgba(256,256,256,0.3)",
            borderColor: "rgba(256,256,256,0.3)",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <JoyTypography level="h5" sx={{ ml: 0.5 }}>
            <Link
              overlay
              underline="none"
              onClick={() => navigate(link)}
              sx={{
                color: "white",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              {name}
            </Link>
          </JoyTypography>
          <div style={{ flexGrow: 1 }}></div>
          {info && info.time ? (
            <>
              <JoyTypography level="h6" sx={{ verticalAlign: "middle" }}>
                {info.time.hours.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
                :
                {info.time.minutes.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
                :
                {info.time.seconds.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
              </JoyTypography>
              <TimerIcon
                sx={{
                  marginTop: 0.1,
                  marginLeft: 0.5,
                  marginRight: 3,
                  fontSize: "x-large",
                }}
              />
            </>
          ) : (
            <></>
          )}
          {info && info.edits ? (
            <>
              <JoyTypography level="h6">{info.edits}</JoyTypography>
              <EditIcon
                sx={{
                  marginTop: 0.1,
                  marginLeft: 0.5,
                  marginRight: 3,
                  fontSize: "x-large",
                }}
              />
            </>
          ) : (
            <></>
          )}
        </CardContent>
        {info ? (
          <CardOverflow
            variant="soft"
            sx={{
              display: "flex",
              gap: 1.5,
              px: "var(--Card-padding)",
              bgcolor: "rgba(256,256,256,0.1)",
            }}
          >
            {info.trophy ? (
              <EmojiEventsIcon
                sx={{ color: info.trophy, fontSize: "xx-large" }}
              />
            ) : (
              <CheckIcon sx={{ color: "lightgreen", fontSize: "xx-large" }} />
            )}
          </CardOverflow>
        ) : (
          <></>
        )}
      </Card>
    </CssVarsProvider>
  );
}

export default Levels;
