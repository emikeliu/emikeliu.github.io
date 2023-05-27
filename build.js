const fs =  require("fs")
const path = require("path")
const readline = require("readline")
articleList = []
function normalizedArticleList(files) {
    return files.map((T) => {
        let data = fs.readFileSync(T,{encoding:"utf-8"})
        let eol = data.indexOf("\n")
        let config = JSON.parse(data.substring(9,eol-1))
        let context = data.substring(eol+1,eol+51)
        let info = path.parse(T)
        return (
            {
                "context":context,
                "path": T,
                "ext": info.ext,
                "showName": config.name,
                "author": config.author,
                "tag": config.tag
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
fs.writeFileSync("./src/pages/articles.json", JSON.stringify(normalizedArticleList(addDirectory(buildArticleList)("./articles"))), {encoding:"utf-8"})