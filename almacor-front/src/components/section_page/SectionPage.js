import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import "./SectionPage.css";

function SectionPage(props) {
    return (
        <>
            <div className="section-page-header">
                <Typography variant="h1">{props.sectionHeader}</Typography>
            </div>

            <Grid container>
                <Grid xs={12} sm={6} md={5} lg={4}>
                    <Card variant="outlined">{props.children}</Card>
                </Grid>
            </Grid>
        </>
    );
}

export default SectionPage;
