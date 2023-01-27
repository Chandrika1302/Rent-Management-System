import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Paper from "@mui/material/Paper";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import { useNavigate } from "react-router-dom";

export default function FixedBottomNavigation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Summary"
            icon={<SummarizeOutlinedIcon />}
            onClick={() => {
              navigate("/summary");
            }}
          />
          <BottomNavigationAction
            label="All"
            icon={<LibraryBooksIcon />}
            onClick={() => {
              navigate("/");
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
