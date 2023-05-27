import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade, Grid, ScopedCssBaseline, ThemeProvider, createTheme, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import { HashRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import NaviBar from "./pages/NaviBar";
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
function App() {
  let ready = true;
  let defaultTheme = createTheme({
    // components: {
    //     : {
    //       styleOverrides: {
    //         backgroundColor:"#f5f5f5"
    //       }
    //     }
    // }
  })
  return (
    <HashRouter>
      <ThemeProvider theme={defaultTheme} >
        <ScopedCssBaseline>
          <Routes>
            <Route path="/" element={<NaviBar isIndex={true}/>} />
            <Route path="*" element={<NaviBar isIndex={false}/> }/>
          </Routes>
          <Box component="div" style={{ margin: "0 0 0 0" }}>
            <main style={{backgroundColor:"#f5f5f5",height:"100vh"}}>
            <Fade in={ready} timeout={800}>
              <Box component="main">
                <Grid container space={0}>
                  <Grid item xs={0} sm={0} md={0} lg={1} xl={1}></Grid>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                    <Routes>
                      <Route index path="/" element={<PageLoader/>} />
                      <Route path="" element={<PageLoader/>} />
                      {articles.map((T)=>{
                        return <Route path={"/articles/"+T.path} element={<PageViewer title={T.showName} file={T.path}/>}/>
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


  );
}

export default App;
