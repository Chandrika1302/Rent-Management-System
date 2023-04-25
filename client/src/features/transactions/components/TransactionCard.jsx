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
      <CustomLink
        to={"/transactions/" + transaction._id}
        sx={{ flex: 1, display: "flex" }}
      >
        <Paper elevation={3} sx={{ p: 1, flex: 1 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text", ml: 4, mt: 1, mb: 1 }}
          >
            Date: {new Date(transaction.date).toLocaleString()}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Money Given to Owner: {transaction.moneyToOwner}
          </Typography>{" "}
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Money Lent to Tenant / Other Charges: {transaction.moneyFromOwner}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Previous Balance: {transaction.previousBalance}
          </Typography>{" "}
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text", ml: 4, mt: 1, mb: 1 }}
          >
            Balance Now: {transaction.presentBalance}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text", ml: 4, mt: 1, mb: 1 }}
          >
            Remarks: {transaction.remarks}
          </Typography>
        </Paper>
      </CustomLink>
    </Box>
  );
}
TransactionCard.propTypes = {
  transaction: PropTypes.object,
};
