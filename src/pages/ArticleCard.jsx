import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import { Component } from "react";
class ArticleCard extends Component {
    render() {
        return (

            <Card style={{ margin: "auto", weight: "80%", maxWidth: "100%", flex: "auto" }}>
                <CardActionArea href={this.props.path}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" sx={{ bgcolor: "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) }}>
                                {this.props.author[0]}
                            </Avatar>
                        }
                        title={this.props.showName}
                        subheader={this.props.author}

                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {this.props.context.substring(0, 256)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}
export default ArticleCard