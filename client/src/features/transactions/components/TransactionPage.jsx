import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { selectToken } from "../../user/userSlice.js";
import apiFetch from "../../../lib/apiFetch.js";

function Transaction() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});
  const [fetching, setFetching] = useState(true);
  const token = useSelector(selectToken);

  useEffect(() => {
    const asyncTransactionFetch = async () => {
      setFetching(true);
      const transactionRaw = await apiFetch("/api/transactions/" + id, {
        token,
      });
      const transaction = transactionRaw.data?.transaction;
      const error = transactionRaw.error?.message;
      if (error) {
        console.error(error);
      }
      setTransaction(transaction);
      setFetching(false);
    };
    asyncTransactionFetch();
  }, [id, token]);

  if (transaction == null && !fetching) {
    return (
      <Typography variant="h2" component="h2">
        No Transaction Found
      </Typography>
    );
  }
  if (fetching) {
    return (
      <Typography variant="h2" component="h2">
        Loading...
      </Typography>
    );
  }
  return (
    <Grow in>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Paper elevation={2} sx={{ p: 1, width: 1 }}>
          <Typography variant="h5" component="h3">
            Date: {new Date(transaction.date).toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            component="h4"
            sx={{ color: "text.secondary" }}
          >
            Room Number:
            {transaction.room.number}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "text.primary", mt: 2, mb: 0 }}
          >
            Transaction Information:
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Money Given to Owner:{" "}
            <Typography
              component="span"
              variant="h6"
              sx={{ color: "text.primary" }}
            >
              {transaction.moneyToOwner}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Money Lent to Tenant/Other Charges:{" "}
            <Typography
              component="span"
              variant="h6"
              sx={{ color: "text.primary" }}
            >
              {transaction.moneyFromOwner}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Remarks: {transaction.remarks}
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/rooms/" + transaction.room._id);
          }}
        >
          Visit Room
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/transactions/?room=" + transaction.room._id);
          }}
        >
          View All Transactions of Same Room
        </Button>
      </Box>
    </Grow>
  );
}

export default Transaction;
