import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";

function CustomLink({ color = "white", children, to, ...args }) {
  const sxProp = args.sx;
  let sx = { color, textDecoration: "none" };
  if (sxProp) {
    Object.assign(sx, sxProp);
  }
  return (
    <Link to={to} component={RouterLink} {...args} sx={sx}>
      {children}
    </Link>
  );
}

CustomLink.propTypes = {
  color: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default CustomLink;
