import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TransactionCard from "./components/TransactionCard";
import { selectToken } from "../user/userSlice.js";
import apiFetch from "../../lib/apiFetch";
import { showErrorToast } from "../../components/ui/toasts";
import { useSearchParams } from "react-router-dom";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [fetching, setFetching] = useState(true);
  const token = useSelector(selectToken);

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");

  useEffect(() => {
    const asyncTransactionFetch = async () => {
      setFetching(true);
      const transactionsRaw = await apiFetch(
        "/api/transactions/?roomId=" + roomId,
        { token }
      );
      const transactions = transactionsRaw.data?.transactions;

      //sort properly according to dates
      transactions.sort(function (a, b) {
        return -(new Date(a.date) - new Date(b.date));
      });

      const error = transactionsRaw.error?.message;
      if (error) {
        showErrorToast(error);
      }
      setTransactions(transactions);
      setFetching(false);
    };
    asyncTransactionFetch();
  }, []);

  if (transactions.length === 0 && fetching == false) {
    return (
      <Typography variant="h2" component="h2">
        No transaction Found
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
      <Grid container spacing={2}>
        {transactions.map((transaction) => {
          return (
            <Grid item xs={12} key={transaction._id}>
              <TransactionCard transaction={transaction} />
            </Grid>
          );
        })}
      </Grid>
    </Grow>
  );
}

export default AllTransactions;
