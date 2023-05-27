import { Box, Typography } from "@mui/material";
import hljs from "highlight.js";
import { Component, Fragment } from "react";
class PageViewer extends Component {
    constructor() {
        super()
        this.state={text:""}
    }
    componentDidMount() {
        import("highlight.js/styles/mono-blue.css")
        import("./articles/"+this.props.file).then((value)=>{
            // this.setState({text:value})
            // console.log(value.default)
            this.setState({text:value.default})
        })
    }
    componentDidUpdate() {
        hljs.highlightAll(document.querySelectorAll("pre code"))
    }
    render() {
        return <Fragment >
            <Box style={{marginTop:"5vh",marginBottom:"2vh"}}>

            
            <Typography variant="h3" component="div">
                {this.props.title}
            </Typography>
            <div dangerouslySetInnerHTML={{__html:(this.state.text)}} style={{margin:"5px 5px 5px 5px"}} id="element"></div>
            <Typography variant="p" color="grey" component="div">
                编辑于 {this.props.modify} · {this.props.license}
                
            </Typography>
            </Box>
            </Fragment>
    }
}
export default PageViewer