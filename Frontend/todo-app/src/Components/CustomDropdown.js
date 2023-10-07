import { Alert, Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { Delete, Post, Patch, Put } from '../Config/Baseapimethods';
import CircularProgress from '@mui/material/CircularProgress';
import FolderIcon from '@mui/icons-material/Folder';


const CustomDropdowns = ({ optionsArray }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(index === openDropdown ? null : index);
  };

  const [catArray, setCatArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [todo, setTodo] = useState({});
  const [checkBoxDisabeled, setcheckBoxDisabeled] = useState(false);
  const [listArray, setListArray] = useState(optionsArray);

  const createTodo = (catId) => {

    const todoAdd = {
      ...todo,
      categoryId: catId
    }

    Post("todo/addTodo", todoAdd).then((res) => {
      console.log(res.data,"here we goooooooooooo");
      setListArray([...optionsArray,res.data]);

    }).catch((err) => {

    })

  }

  const handleCat = (cat) => {
    console.log(cat, "category_api called");
    Post('/todo/findTodosByCatId', { "categoryId": cat }).then((res) => {
      console.log(res.data.data);
      setCatArray([...res.data.data])

    }).catch(() => { })
    // find Todos from Id 
  }

  const deleteTodo = (id) => {
    setIsLoading(true)
    console.log("llll", id);
    Delete('/todo/deleteTodo', id).then((res) => {
      console.log(res);

      setMessage(" Todo Deleted Successfully...");
      console.log(message);
      setIsLoading(false);
      setOpen(true)
      setSeverity('success');

    }).catch(() => {

    })


  }


  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    setTodo({ ...todo, title: e.target.value });
  }

  const [idForCheckBox, setIdForCheckBox] = useState('')

  const handleCheckBox = (id) => {
    setcheckBoxDisabeled(true);
    setIdForCheckBox(id)
    console.log(id);
    Put('/todo/updateTodoStatus', { id: id, status: true }).then((res) => {
      console.log(res, "updated");
    }).catch((err) => {

    })
  }

  useEffect(() => {

  })

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
    // width:"100%"
  };

  return (

    <Box className="multiple-dropdowns" sx={{ padding: 2 }} style={dropdownStyle}>
      {optionsArray.map((options, index) => (
        <Box key={index} className="dropdown" onClick={() => { handleCat(options._id) }}>
          {/* <Box className="dropdown-header" onClick={() => toggleDropdown(index)} sx={{ padding: 1 }}> */}
          {/* {options[openDropdown === index ? 'selectedOption' : 'defaultOption']} */}
          {/* {options['name']} */}
          {/* ===========================Start===================== */}


          {/* {options['name']} */}
          {/* ==============================Ends====================== */}
          {/* <span className='arrow'> {openDropdown === index ? "▼" : "▲"}</span>
          </Box> */}
          <Box className="dropdown-header" onClick={() => toggleDropdown(index)} sx={{ padding: 1 }} style={headerStyle}>
            <span style={{ marginRight: '5px' }}><FolderIcon color='disabled' /></span>{options['name']}
            <span style={{ marginLeft: 10, borderWidth: 2, borderColor: "gray", width: 150, border: "1px solid gray" }}></span>
            <span className="line" style={{ margin: '0 5px' }}></span>
            <span className='arrow'> {openDropdown === index ? "▼" : "▲"}</span>

          </Box>
          {openDropdown === index && (
            <Box>
              <ul className="dropdown-list">
                {catArray.map((option, i) => (
                  // <li key={option.value} style={{listStyle:"none"}} >{option.label}</li>
                  <Box sx={{ marginBottom: 2 }}>
                    {console.log(option, "option")}
                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, border: "1px solid gray", marginBottom: 4 }}>
                      <label style={{
                        // display: 'flex', alignItems: 'center', color: "#888", textDecoration: `${checkBoxDisabeled || option.completed ? "line-through" : ""}`
                        display: 'flex', alignItems: 'center', color: "#888", textDecoration: `${idForCheckBox == option._id || option.completed ? "line-through" : ""}`
                      }}>
                        {/* <input  disabled={ checkBoxDisabeled || option.completed ? true : false} type="checkbox" style={{ marginRight: '5px' }} onChange={() => { handleCheckBox(option._id) }} /> */}
                        <input checked={idForCheckBox == option._id || option.completed ? true : false} disabled={idForCheckBox == option._id || option.completed ? true : false} type="checkbox" style={{ marginRight: '5px' }} onChange={() => { handleCheckBox(option._id) }} />
                        {option.title}
                      </label>
                      <Button bg="red" btnText="x" fontSize={16} func={() => { deleteTodo(option._id) }} />

                    </li>
                  </Box>

                ))}
              </ul>
              <Box sx={{ textAlign: "center", marginLeft: 4 }}>
                <TextInput inputText="Enter Todo" onChange={handleChange} />
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

export default CustomDropdowns;
