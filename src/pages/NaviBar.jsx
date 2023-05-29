import { ArrowBack, Menu, MoreVert } from '@mui/icons-material';
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
        function ToolbarClick() {
            if (!this.props.isIndex) {
                window.location.hash = ""
            }
            else {
                this.props.toggleMenuOn()
            }
        }
        return (
            <HideOnScroll {...this.props}>

                <AppBar position="sticky" enableColorOnDark sx={{overflow:"hidden",width:"100%"}}>
                    
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, flex: "0 0 auto"}}
                        onClick={ToolbarClick.bind(this)}
                    >
                    {
                        (this.props.isIndex)
                        ?
                            <Menu/>
                        :<ArrowBack/>
                    }
                        
                    </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flex: "1 1 auto",
                                fontSize: "1.25rem",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden"
                            }}
                        >
                            {this.props.pageName} - Mike Liu 的个人博客
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ ml: 2, flex: "0 0 auto"}}
                        >
                        <MoreVert />

                        </IconButton>    
                    </Toolbar>
                </AppBar>



            </HideOnScroll>
        )
    }
}
export default NaviBar