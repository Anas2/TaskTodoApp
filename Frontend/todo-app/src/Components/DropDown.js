import { Alert, Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { Delete, Post, Put } from '../Config/Baseapimethods';
import CircularProgress from '@mui/material/CircularProgress';
import FolderIcon from '@mui/icons-material/Folder';


const Dropdown = ({ todoList, func }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(index === openDropdown ? null : index);
    };

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [todo, setTodo] = useState({});
    const [catId, setCatId] = useState('')

    const createTodo = (catId) => {
        setIsLoading(true);

        const todoAdd = {
            ...todo,
            categoryId: catId
        }


        Post("todo/addTodo", todoAdd).then((res) => {
            func(res.data.success)
            setMessage(" Todo Created Successfully...");
            setIsLoading(false);
            setOpen(true)
            setSeverity('success');


        }).catch((err) => {

        })

    }


    const deleteTodo = (id) => {
        setIsLoading(true)
        Delete('/todo/deleteTodo', id).then((res) => {
            func(res.data.success);
            setMessage(" Todo Deleted Successfully...");
            setIsLoading(false);
            setOpen(true)
            setSeverity('success');

        }).catch(() => {

        })


    }


    const handleClose = () => {
        setOpen(false)
    }


    const [idForCheckBox, setIdForCheckBox] = useState('')

    const handleCheckBox = (id) => {
        setIdForCheckBox(id)
        Put('/todo/updateTodoStatus', { id: id, status: true }).then((res) => {
            // console.log(res, "updated");
        }).catch((err) => {

        })
    }


    const handleToggleAndCat = (index) => {
        toggleDropdown(index);
    }

    const deleteCategory = (id) => {
        setIsLoading(true);
        Delete(`/categories/deleteCategory`,id).then((res) => {
            func(res.data.success)
            setMessage(" Category Deleted Successfully...");
            setIsLoading(false);
            setOpen(true)
            setSeverity('success');

        }).catch((err) => {

            console.log(err);
        })
    }

    // css
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    };
    const dropdownStyle = {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        padding: "20px",
    };

    return (

        <Box className="multiple-dropdowns" sx={{ padding: 2 }} style={dropdownStyle}>
            {todoList.map((options, index) => (
                <Box key={index} className="dropdown" >

                    <Box className="dropdown-header" onClick={() => { handleToggleAndCat(index) }} sx={{ padding: 1 }} style={headerStyle}>
                        <Box sx={{ marginRight: 2 }}><Button style={headerStyle} bg="#f2f2f2" textColor="red" btnText="x" fontSize={16} func={() => { deleteCategory(options._id) }} /></Box>
                        <span style={{ marginRight: '5px' }}><FolderIcon color='disabled' /></span>{options['name']}
                        <span style={{ marginLeft: 10, borderWidth: 2, borderColor: "gray", width: 150, border: "1px solid gray" }}></span>
                        <span className="line" style={{ margin: '0 5px' }}></span>
                        <span className='arrow' > {openDropdown === index ? "▼" : "▲"}</span>

                    </Box>
                    {openDropdown === index && (
                        <Box>
                            <Box style={{ textAlign: "left", padding: 4, marginLeft: 10 }}><span style={{ color: "green" }}> Due in {options.dueDate && Math.floor(((new Date(options.dueDate)) - (new Date())) / (1000 * 60 * 60 * 24)) <= 1 ? 1 : Math.floor(((new Date(options.dueDate)) - (new Date())) / (1000 * 60 * 60 * 24))} Days</span></Box>
                            <ul className="dropdown-list">
                                {options.todos.map((option, i) => (
                                    <Box sx={{ marginBottom: 2 }}>

                                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, border: "1px solid #e5e5e5", marginBottom: 4 }}>
                                            <label style={{
                                                display: 'flex', alignItems: 'center', color: "#888", textDecoration: `${idForCheckBox == option._id || option.completed ? "line-through" : ""}`
                                            }}>
                                                <input checked={idForCheckBox == option._id || option.completed ? true : false} disabled={idForCheckBox == option._id || option.completed ? true : false} type="checkbox" style={{ marginRight: '5px' }} onChange={() => { handleCheckBox(option._id) }} />
                                                {option.title}
                                            </label>
                                            <Button bg="red" btnText="x" fontSize={16} func={() => { deleteTodo(option._id) }} />

                                        </li>
                                    </Box>

                                ))}
                            </ul>
                            <Box sx={{ textAlign: "center", marginLeft: 4 }}>
                                <TextInput type="text" inputText="Enter Todo" onChange={(e) => { setTodo({ ...todo, title: e.target.value }); }} />
                                <Button btnText="Create Todo" bg="blue" padding={10} fontSize={14} func={() => { createTodo(options._id) }} />
                            </Box>
                            {isLoading ? <Box>
                                <CircularProgress />
                                <Box sx={{ color: "gray", fontSize: 20, padding: 2 }}>...Loading</Box>
                            </Box> : ""}
                        </Box>
                    )}
                </Box>
            ))}

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dropdown;
