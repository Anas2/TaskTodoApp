import { Alert, Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextInput from '../Components/TextInput';
import DropDown from '../Components/DropDown';
import Button from '../Components/Button';
import { Post, Get } from '../Config/Baseapimethods';
import CircularProgress from '@mui/material/CircularProgress';

function TodoScreen(props) {

    const [inputValue, setInputValue] = useState({});
    const [todoList, setTodoList] = useState([]);
    const [hideBtn, setHideBtn] = useState(true);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');



    const addTodo = () => {
        setIsLoading(true);

        if (inputValue.name.length < 5) {
            setMessage(" character length must be greter then 5 ");
            setIsLoading(false);
            setOpen(true)
            setSeverity('error');

            return;
        }
        if (!inputValue.hasOwnProperty("dueDate")) {
            inputValue.dueDate = new Date();
        }

        Post("/categories/addCategory", inputValue).then((res) => {

            setIsLoading(false);
            setOpen(true);
            setMessage("Todo Saved Successfully...");
            setSeverity('success');

            Get("/categories").then((res) => {
                setTodoList([...res.data.data])
            }).catch((err) => {
                console.log(err);
            })

        }).catch((err) => {
            console.log(err);
            setMessage(err.message)
            setOpen(true)
            setSeverity('error');
        })

    }


    const checkTodoAdded = (res) => {
        // setWhenTodoAdd(res);    
        Get("/categories").then((res) => {
            setTodoList([...res.data.data])
            setIsLoading(false)
        }).catch((err) => {

        })

    }

    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        setIsLoading(true)
        Get("/categories").then((res) => {
            setTodoList([...res.data.data])
            setIsLoading(false)
        }).catch((err) => {

        })


    }, [setTodoList])

    return (
        <Box sx={{ textAlign: "center", padding: 2 }} >
            <Box>
                <h1 style={{color:"green"}}>TODO APP</h1>
            </Box>
            <Box>
                <TextInput onChange={(e) => { setInputValue({ ...inputValue, name: e.target.value }) }} disabled={isLoading} type="text" inputText='Enter Category' />
                <TextInput width="10%" type="date" onChange={(e) => { setInputValue({ ...inputValue, dueDate: e.target.value }) }} />
                <Button func={addTodo} /*disabled={hideBtn}*/ bg="blue" btnText="Add Todo" padding={10} fontSize={14} />
            </Box>


            <Box>
                <DropDown todoList={todoList} func={checkTodoAdded} />
            </Box>
            {isLoading ? <Box>
                <CircularProgress />
                <Box sx={{ color: "gray", fontSize: 20, padding: 2 }}>...Loading</Box>
            </Box> : ""}

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default TodoScreen;