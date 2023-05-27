import { Menu } from '@mui/icons-material';
import { AppBar, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import { Component } from "react";
function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};
class NaviBar extends Component {
    render() {
        return (
            <HideOnScroll {...this.props}>

                <AppBar position="sticky">
                    
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                        <Typography
                            variant="h5"
                            component="div"
                        >
                            Mike Liu 的个人博客
                        </Typography>
                    </Toolbar>

                </AppBar>



            </HideOnScroll>
        )
    }
}
export default NaviBar