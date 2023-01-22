import React from "react";
import "./form.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                ("This Magic Brain will detect faces in your pictures. Give it a try!")
            </p>
            <div className="form ma3 br3 shadow-2 center" style={{width: "500px"}}>
                <div className="ma3 ">
                    <input className="f3 pad2 ma4 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 br2 grow f4 link ph3 pv2 dib white bg-light-blue" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;