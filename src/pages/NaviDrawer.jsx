import { useTheme } from "@emotion/react";
import { ArrowBack, Home, Info, Inventory, Label, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuList, Toolbar, Typography } from "@mui/material";
import { Fragment } from "react";
import * as MikeLiu from "../static/avatar.png";
import * as Background from "../static/background.jpg";

function NaviDrawer(props) {
    let theme = useTheme(   )
    return <Fragment>
        <Drawer
            anchor="left"
            open={props.open}
            onClose={props.toggleOpenStatus}
        >
            <Box sx={{ width: { xl: "25vw", lg: "24em", md: "24em", sm: "24em", xs: "80vw" } }}>
            <Box sx={{ backgroundImage: "url(" + Background.default + ")", backgroundSize: "100% 100%", pl: "1rem" }}  >
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ marginRight: "2vw" }}
                    onClick={props.toggleOpenStatus}
                >
                    <ArrowBack color={theme.palette.background.default} />
                </IconButton>
                
                
                </Toolbar>
                
                <Avatar alt="Mike Liu" src={MikeLiu.default} sx={{ height: "10vh", width: "10vh" }} ></Avatar>
                <Box>
                        <Typography
                            variant="h3"
                            component="p"
                            sx={{ fontWeight: '700', fontSize: '1.5rem', color: "white" }}
                        >
                            Mike Liu (ML)
                        </Typography>
                    
                    
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ fontWeight: '300', fontSize: '1.25rem', color: "white", mb: "0.25rem" }}
                        >
                            emikeliu · she/her
                    </Typography>
                    </Box>
                </Box>
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <MenuList >
                    {['最新', '归档', '标签'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {
                                                [<Home/>,<Inventory/>,<Label/>][index]
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <Divider />
                            {['关于', '设置'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            
                                            {[<Info/>,<Settings/>][index]}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}


                        
                    </MenuList>
                    </Box>
                    {/* <Tabs variant="fullWidth" indicatorColor="primary" textColor="inherit" value={selection} onChange={toggleTabSelection}>
                        <Tab label="最新"/>
                        <Tab label="归档"/>
                    </Tabs>
                </Box>
                <TabPanel value={selection} index={0}>
                    最新
                </TabPanel>
                <TabPanel value={selection} index={1}>
                    归档
                </TabPanel> */}
            </Box>
        </Drawer>
    </Fragment>
}
export default NaviDrawer