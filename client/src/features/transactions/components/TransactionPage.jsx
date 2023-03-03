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
import CustomLink from "../../../components/ui/CustomLink.jsx";
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
            Transfer: {transaction.transfer}
          </Typography>
          <Typography
            variant="h4"
            component="p"
            sx={{ color: "text.primary", mt: 2, mb: 0 }}
          >
            Room:
            <CustomLink to={"/rooms/" + transaction.room._id} color="primary">
              {transaction.room.number}
            </CustomLink>
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 1, mb: 1 }}
          >
            Previous Balance: {transaction.previousBalance}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            Balance Current: {transaction.presentBalance}
          </Typography>{" "}
          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            Date: {new Date(transaction.date).toLocaleString()}
          </Typography>{" "}
          <Typography variant="h6" component="p" sx={{ mt: 3 }}>
            Remakrs: {transaction.remarks}
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/transactions/update/" + transaction._id);
          }}
        >
          Update
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/transactions/delete/" + transaction._id);
          }}
        >
          delete
        </Button>
      </Box>
    </Grow>
  );
}

export default Transaction;
