import { Typography } from "@mui/material";
import { Component } from "react";
class PageViewer extends Component {
    render() {
        return <Typography>
            {import("../../articles/"+this.props.file)}
        </Typography>
    }
}
export default PageViewer