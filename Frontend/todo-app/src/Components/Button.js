import React from 'react';

function Button(props) {
    const { func, disabled, bg,btnText,padding ,fontSize ,textColor="white"} = props;
    return (
    
        <button style={{ padding: padding, fontSize: fontSize, color: textColor, backgroundColor: `${disabled ? "gray" : bg}`, fontWeight: "bold", border: "none" }} disabled={disabled} onClick={func}>
            {btnText}
        </button>
     
    );
}

export default Button;