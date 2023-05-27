import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade, Grid, ScopedCssBaseline, ThemeProvider, createTheme, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <ScopedCssBaseline>
          <NaviBar />
          <Box component="div" style={{ margin: "0 0 0 0" }}>
            <main>
              <Box component="main">
                <Grid container space={0}>
                  <Grid item xs={0} sm={0} md={1} lg={2} xl={1}></Grid>
                  <Grid item xs={12} sm={12} md={10} lg={8} xl={10}>
                    <Routes>
                      <Route path="/" element={<PageLoader/>} />
                      {articles.map((T)=>{
                        return <Route path={"/"+T.path} element={<PageViewer file={"/"+T.path}/>}/>
                      })}
                      {/* <Route path="/articles/:file" element={<PageViewer/>} /> */}
                    </Routes>

                  </Grid>
                  <Grid item xs={0} sm={0} md={1} lg={2} xl={1}></Grid>
                </Grid>
              </Box>
            </main>
            <ScrollTop>
              <Fab onClick={scroll} size="small" aria-label="scroll back to top">
                <KeyboardArrowUp />
              </Fab>
            </ScrollTop>
          </Box>
        </ScopedCssBaseline>
      </ThemeProvider>

    </BrowserRouter>


  );
}

export default App;
