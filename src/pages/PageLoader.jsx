import { List, ListItem } from '@mui/material';
import { Component } from 'react';
import ArticleCard from './ArticleCard';
import articles from './articles.json';
class PageLoader extends Component {
    render() {
        return <List sx={{ margin: "auto", maxWidth: "80%", textAlign: "center"}}>
            {
            articles.map((T)=>{
                return (<ListItem alignItems="center"><ArticleCard author={T.author} showName={T.showName} context={T.context} path={"#/articles/"+T.path}></ArticleCard></ListItem>)
            })}
        </List>
            
        
    }
}
export default PageLoader