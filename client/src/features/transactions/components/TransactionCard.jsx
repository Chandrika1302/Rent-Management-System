import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CustomLink from "../../../components/ui/CustomLink.jsx";
import PropTypes from "prop-types";

export default function TransactionCard({ transaction }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <CustomLink to={"/transactions/" + transaction._id}>
        <Paper elevation={3} sx={{ p: 1 }}>
          <Typography variant="h5" component="h3">
            Transfer: {transaction.transfer}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 3, mb: 3 }}
          >
            Previous Balance: {transaction.previousBalance}
          </Typography>{" "}
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 3, mb: 3 }}
          >
            Balance Now: {transaction.presentBalance}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 3, mb: 3 }}
          >
            Room: {transaction.room.number}
          </Typography>
        </Paper>
      </CustomLink>
    </Box>
  );
}
TransactionCard.propTypes = {
  transaction: PropTypes.object,
};
