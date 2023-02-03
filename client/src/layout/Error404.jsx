import { Link } from "react-router-dom";
import Layout from "./Layout";

export default function Error404() {
  return (
    <Layout>
      <div>
        Error 404 not found! back to <Link to={`/`}>homepage?</Link>
      </div>
    </Layout>
  );
}
