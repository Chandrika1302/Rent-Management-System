import DashBoardCard from "./DashboardCard";
import Stats from "./Stats";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

function Home() {
    return (
        <Grow in>
            <Box>
                <DashBoardCard />
                <Stats />
            </Box>
        </Grow>
    );
}

export default Home;
