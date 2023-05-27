import hljs from "highlight.js";
import { Component } from "react";
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
            this.setState({text:"<h1>"+this.props.title+"</h1><p>最后修改于"+this.props.modify+"</p>"+value.default})
        })
    }
    componentDidUpdate() {
        hljs.highlightAll(document.querySelectorAll("pre code"))
    }
    render() {
        return <div dangerouslySetInnerHTML={{__html:(this.state.text)}} style={{margin:"5px 5px 5px 5px"}} id="element"></div>
    }
}
export default PageViewer