import { Avatar, Box, Divider, Drawer, MenuItem, MenuList, Toolbar, Typography, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import * as MikeLiu from "../static/avatar.png";
import * as Background from "../static/background.jpg";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
function SlideMenu(props) {
    const theme = useTheme()
    
    const [selection ,updateSelection] = useState(0)
    function toggleTabSelection(event, value) {
        updateSelection(value)
    }
    return <Fragment>
        <Drawer
            anchor="left"
            open={props.open}
            onClose={props.toggleOpenStatus}
        >
            <Box sx={{ width: {lg:"25vw",xl:"25vw",md:"40vw",sm:"60vw",xs:"70vw"}}}>
                <Box sx={{height: "30vh",backgroundImage:"url("+Background.default+")",backgroundSize:"100% 100%"}}  >
                <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color={theme.palette.background.default}
                    aria-label="menu"
                    sx={{ marginRight: "2vw"}}
                    onClick={props.toggleOpenStatus}
                >
                    <ArrowBack color={theme.palette.background.default}/>
                </IconButton>
                <Typography
                            variant="h5"
                            component="div"
                            color={theme.palette.background.default}
                            sx={{textAlign:"center",marginTop:"1vh"}}
                        >
                            Mike Liu 的个人博客
                        </Typography> */}
                </Toolbar>
                
                <Avatar alt="Mike Liu" src={MikeLiu.default} sx={{ml:{lg:"calc((25vw - 15vh) / 2)",xl:"calc((25vw - 15vh) / 2)",md:"calc((40vw - 15vh) / 2)",sm:"calc((60vw - 15vh) / 2)",xs:"calc((70vw - 15vh) / 2)"}, height:"15vh", width:"15vh"}} ></Avatar>
                </Box>
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <MenuList >
                        <MenuItem sx={{marginTop:"1em"}}>
                        <Typography
                            variant="h5"
                            component="span"
                            
                        >
                            最新
                        </Typography>
                        </MenuItem>
                        <MenuItem sx={{marginTop:"1em"}}>
                        <Typography
                            variant="h5"
                            component="span"
                            
                        >
                            归档
                        </Typography>
                        </MenuItem>
                        <MenuItem sx={{marginTop:"1em"}}>
                        <Typography
                            variant="h5"
                            component="span"
                            
                        >
                            标签
                        </Typography>
                        </MenuItem>
                        <Divider/>
                        <MenuItem sx={{marginTop:"1em"}}>
                        <Typography
                            variant="h6"
                            component="span"
                            
                        >
                            关于
                        </Typography>
                        </MenuItem>
                        <MenuItem sx={{marginTop:"1em"}}>
                        <Typography
                            variant="h6"
                            component="span"
                            
                        >
                            设置
                        </Typography>
                        </MenuItem>
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
export default SlideMenu