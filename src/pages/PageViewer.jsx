import { Box, Typography } from "@mui/material";
import hljs from "highlight.js";
import { Component, Fragment } from "react";
class PageViewer extends Component {
    static formatterCN = new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
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
        this.props.setTitle(this.props.title)
    }
    componentDidUpdate() {
        hljs.highlightAll(document.querySelectorAll("pre code"))
    }
    render() {
        return <Fragment >
            <Box style={{marginTop:"5vh",marginBottom:"2vh",marginLeft:"2vw",marginRight:"2vw"}}>

            
            <Typography variant="h3" component="div">
                {this.props.title}
            </Typography>
            <div dangerouslySetInnerHTML={{__html:(this.state.text)}} style={{margin:"5px 5px 5px 5px"}} id="element"></div>
            <Typography variant="p" color="grey" component="div">
                编辑于 {PageViewer.formatterCN.format(new Date(this.props.modify))} · {this.props.license}
                
            </Typography>
            </Box>
            </Fragment>
    }
}
export default PageViewer