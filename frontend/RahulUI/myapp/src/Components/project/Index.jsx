import React from "react";
import Header from "./Header";
import Home from "./home";

const Blog=()=>{
    return(
        <React.Fragment>
            <div className="Blog-Container">
                <Header/>
                <Home/>
            </div>
        </React.Fragment>
    )
}

export default Blog;