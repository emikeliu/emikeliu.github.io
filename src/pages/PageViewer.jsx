import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CryptoJS, { AES } from "crypto-js";
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
        this.state = { text: "", encrypted: false }
    }
    componentDidMount() {
        this.setState({encrypted:this.props.encrypted})
        import("highlight.js/styles/mono-blue.css")
        import("./articles/" + this.props.file).then((value) => {
            // this.setState({text:value})
            // console.log(value.default)
            this.setState({ text: value.default,password:"" })

        })
        this.props.setTitle(this.props.title)
    }
    componentDidUpdate() {
        hljs.highlightAll(document.querySelectorAll("pre code"))
    }
    render() {
        function AESDecrypt() {
            console.log(this.state.text)
            this.setState({text:AES.decrypt(this.state.text, this.state.password, {
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7,
            }).toString(),encrypted:false})
        }
        return <Fragment >
            <Box style={{ marginTop: "5vh", marginBottom: "2vh", marginLeft: "2vw", marginRight: "2vw" }}>
                <Modal open={this.state.encrypted} >
                    <Box >
                        <Typography  variant="h6" component="h2">
                            本文档是加密文档
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            请输入文档密码
                        </Typography>
                        <TextField label="密码" variant="standard" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
                        <Button onClick={AESDecrypt.bind(this)}>解密</Button>
                    </Box>
                </Modal>

                <Typography variant="h3" component="div">
                    {this.props.title}
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: (this.state.text) }} style={{ margin: "5px 5px 5px 5px" }} id="element"></div>
                <Typography variant="p" color="grey" component="div">
                    编辑于 {PageViewer.formatterCN.format(new Date(this.props.modify))} · {this.props.license}

                </Typography>
            </Box>
        </Fragment>
    }
}
export default PageViewer