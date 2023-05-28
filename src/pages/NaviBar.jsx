import { ArrowBack, Menu } from '@mui/icons-material';
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
            if(!this.props.isIndex) {
                window.location.hash = ""
            }
            else {
                this.props.toggleMenuOn()
            }
        }
        function MenuButtonClick() {
            this.props.toggleMenuOn()
        }
        return (
            <HideOnScroll {...this.props}>

                <AppBar position="sticky" enableColorOnDark>
                    
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
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
                            variant="h5"
                            component="div"
                        >
                            {this.props.pageName} - Mike Liu 的个人博客
                        </Typography>
                    
                
                    </Toolbar>
                </AppBar>



            </HideOnScroll>
        )
    }
}
export default NaviBar