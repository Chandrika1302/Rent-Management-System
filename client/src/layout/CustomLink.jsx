import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";

function CustomLink({ color = "white", children, to }) {
  return (
    <Link to={to} component={RouterLink} sx={{ color, textDecoration: "none" }}>
      {children}
    </Link>
  );
}

CustomLink.propTypes = {
  color: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.element,
};

export default CustomLink;
