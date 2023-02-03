import { useState } from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function Form({ onSubmit, fields, loading }) {
  const [fieldsData, setFieldsData] = useState(structuredClone(fields));

  function onChangeHandler(e) {
    const value = e.target.value;
    const name = e.target.name;
    const fieldsDataCopy = structuredClone(fieldsData);
    fieldsDataCopy[name].value = value;
    setFieldsData(fieldsDataCopy);
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "45ch" },
      }}
      autoComplete="off"
    >
      {Object.entries(fieldsData).map(([fieldName, fieldData]) => {
        return (
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            key={fieldName}
          >
            <TextField
              required={fieldData.required}
              name={fieldName}
              label={fieldData.placeHolder}
              variant="standard"
              value={fieldData.value}
              onChange={onChangeHandler}
              type={fieldData.type}
            />
          </Box>
        );
      })}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained">
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
}

Form.propTypes = {
  fields: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};
