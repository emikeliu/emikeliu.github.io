import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade, Grid, ScopedCssBaseline, ThemeProvider, createTheme, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import { Component } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import NaviBar from "./pages/NaviBar";
import NaviDrawer from "./pages/NaviDrawer";
import PageLoader from "./pages/PageLoader";
import PageViewer from "./pages/PageViewer";
import articles from './pages/articles.json';
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
function scroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired
};
class App extends Component {
  constructor()
  {
    super()
    this.state=({menuOn:false,ready:true,title:""})
    this.setTitle=function(title){
      this.setState({title:title})
    }
    this.defaultTheme = createTheme({
      // components: {
      //     : {
      //       styleOverrides: {
      //         backgroundColor:"#f5f5f5"
      //       }
      //     }
      // }
    })
  }
render(){
  return (
    <HashRouter>
      <ThemeProvider theme={this.defaultTheme} >
        <ScopedCssBaseline>
          <NaviDrawer toggleOpenStatus={()=>{this.setState({"menuOn":!this.state.menuOn})}} open={this.state.menuOn}/>
          <Routes>
            <Route path="/" element={<NaviBar pageName="首页" toggleMenuOn={()=>{this.setState({"menuOn":!this.state.menuOn})}} isIndex={true}/>} />
            <Route path="*" element={<NaviBar pageName={this.state.title} toggleMenuOn={()=>{}} isIndex={false}/> }/>
          </Routes>
          <Box component="div" style={{ margin: "0 0 0 0" }}>
            <main style={{backgroundColor:"#f5f5f5",height:"100vh"}}>
            <Fade in={this.state.ready} timeout={800}>
              <Box component="main">
                <Grid container space={0}>
                  <Grid item xs={0} sm={0} md={0} lg={1} xl={1}></Grid>
                  <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                    <Routes>
                      <Route index path="/" element={<PageLoader/>} />
                      <Route path="" element={<PageLoader/>} />
                      {articles.map((T)=>{
                        return <Route path={"/articles/"+T.path} element={<PageViewer license={T.license} title={T.showName} modify={T.modify} file={T.path} setTitle={this.setTitle.bind(this)}/>}/>
                      })}
                      {/* <Route path="/articles/:file" element={<PageViewer/>} /> */}
                      <Route path="*" element={<Error404/>} />
                    </Routes>

                  </Grid>
                  <Grid item xs={0} sm={0} md={0} lg={1} xl={1}></Grid>
                </Grid>
              </Box>
              </Fade>
            </main>
            <ScrollTop>
              <Fab onClick={scroll} size="small" aria-label="scroll back to top">
                <KeyboardArrowUp />
              </Fab>
            </ScrollTop>
          </Box>
        </ScopedCssBaseline>
      </ThemeProvider>

    </HashRouter>


  );}
}

export default App;
