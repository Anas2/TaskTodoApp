import React from 'react';

function TextInput(props) {
    const { inputText,type,width="56%",name } = props;

    return (
        <>

            <input placeholder={inputText}  name={name} type={type} style={{ padding: "10px", width: `${width}`}}  {...props} /> <i>{props.lable}</i>

        </>
    );
}

export default TextInput;