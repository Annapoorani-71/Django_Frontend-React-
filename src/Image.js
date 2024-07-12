// import subu from "./download.jpeg"
import "./Image.css"
const Image=function()
{
    const image=require("./download.jpeg")
    const mystyle={
        color:"green"
    }
    return(
        <div>
        <img src={image}></img>
        <p style={mystyle} >This is paragraph</p>
        </div>
    )
}

export default Image