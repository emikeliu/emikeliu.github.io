const { read } = require("fs")
const fs =  require("fs-extra")
const path = require("path")
const readline = require("readline")
const { AES } = require("crypto-js")
const CryptoJS = require("crypto-js")
let articleList = []

function normalizedArticleList(files) {
    return files.map((T) => {
        let data = fs.readFileSync(path.join("./src/pages/articles",T),{encoding:"utf-8"})
        let stats = fs.statSync(path.join("./src/pages/articles",T))
        let eol = data.indexOf("\n")
        let config = JSON.parse(data.substring(9,eol-1))
        let configText = data.substring(0,eol+1)
        let context = data.substring(eol+1)
        let info = path.parse(T)
        if("encrypted" in config) {
            rl = readline.createInterface({input:process.stdin,output:process.stdout})
            rl.question(
                "文档"+T+"的密码是：", function(answer) {
                    console.log(context,answer)
                    fs.writeFileSync(path.join("./src/pages/articles",T),configText+AES.encrypt(CryptoJS.enc.Utf8.parse(context),answer,{
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Pkcs7,
                    }).toString(),{encoding:"utf-8"})
                    rl.close()
                }
            )
            
        }
        return (
            {
                "encrypted":config.hasOwnProperty("encrypted"),
                "modify":stats.mtime,
                "create":stats.ctime,
                "context":context,
                "path": T,
                "ext": info.ext,
                "showName": config.name,
                "author": config.author,
                "tag": config.tag,
                "license": config.license
            })
    })
}
function addDirectory(func) {
    return function(directory){
        return func(directory).map((T)=>{
            return path.join(directory, T)
        })
    }
}
function buildArticleList(directory) {
    let files = []
    const docs = fs.readdirSync(directory, { withFileTypes: true });
    for (const doc of docs) {
        if (doc.isDirectory()) {
            files.push(...buildArticleList(path.join(directory, doc.name)).map((T) => {
                return path.join(doc.name, T)
            }))
        }
        else {
            files.push(doc.name)
        }
    }
    return files
}
normalizedArticleList(buildArticleList("./src/pages/articles"))
