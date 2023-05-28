const fs =  require("fs-extra")
const path = require("path")
let articleList = []
function normalizedArticleList(files) {
    return files.map((T) => {
        let data = fs.readFileSync(path.join("./src/pages/articles",T),{encoding:"utf-8"})
        let stats = fs.statSync(path.join("./src/pages/articles",T))
        let eol = data.indexOf("\n")
        let config = JSON.parse(data.substring(9,eol-1))
        let context = data.substring(eol+1,eol+51)
        let info = path.parse(T)
        return (
            {
                "modify":stats.mtime,
                "create":stats.birthtime,
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
exports.preprocess = function preprocess()
{
    fs.writeFileSync("./src/pages/articles.json", JSON.stringify(normalizedArticleList(buildArticleList("./src/pages/articles"))), {encoding:"utf-8"})
}
