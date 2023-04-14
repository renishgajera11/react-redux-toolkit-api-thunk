import React from 'react'
import './Crud.css'
import { Button, Pagination } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createUser,readUser ,deleteUser, updateUser ,removeAllUser} from './../../store/userSlice';
import { userAction } from './../../store/userSlice'



function Crud() {

    const dispatch = useDispatch();
    const {data, loading} = useSelector((state) => state.users);
    const dataPerPage = useSelector((state) => state.users.dataPerPage);
    const currentPage = useSelector((state) => state.users.currentPage);

    // console.log(dataPerPage);
    // console.log(currentPage);
   
    const [showPass, setShowPass] = useState(true)
    const [userName , setUserName] = useState()
    const [password , setPassword] = useState()
    const [update , setUpdate] = useState(true)
    const [id , setId] = useState()

    const userdata = { username:userName , password:password , id}

    const submitHandler = (e) =>{
        e.preventDefault();

        if(!userName || !password){
            alert('insert data')
        }else{
        dispatch(createUser(userdata))
        setUserName('');
        setPassword('')
        console.log(userdata);
    
    }    
    }

    const editHandler = (e) =>{
        setId(e.id)
        setPassword(e.password)
        setUserName(e.username)
        setUpdate(false)
    }

    const updateHandler = (e) =>{
        e.preventDefault();

        if (!userName || !password) {
            alert('insert data')
        } else {
            dispatch(updateUser(userdata))
            setUserName('');    
            setPassword('');
            setUpdate(true)
        }
                                                    
    }

    useEffect(() =>{
        dispatch(readUser());
    },[])
 


    const totalPages = Math.ceil(data.length / dataPerPage);
    const pages = [...Array(totalPages + 1).keys()].slice(1);
    const indexOfLastPage = currentPage * dataPerPage;
    const indexOfFirstPage = indexOfLastPage - dataPerPage;

    const visibleData = data.slice(indexOfFirstPage, indexOfLastPage)

    const navigatePrev = ()=>{
        if(currentPage !== 1){
            dispatch(userAction.onNavigatePrev());
        }
    }
    const navigateNext = ()=>{
        if(currentPage !== totalPages){
            dispatch(userAction.onNavigateNext());
        }
    }

    const handleCurrentPage = (element) =>{
        dispatch(userAction.onClickCurrentPage(element))
    }


    return (    
        <div>


            <h2>CRUD opertaion using API</h2>

            <form autoComplete='off' required>

            <div className='crud'>


                <div className='me-5 username'>

                    <span>Enter Username</span><br />
                    <input type='text' placeholder='Enter Username' name='username' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                    
                </div>

                <div className='me-5 password'>

                    {
                        showPass ?
                            <>
                                <span>Enter Password</span><br />
                                <input type='password' placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <i className="fas fa-eye eye" id="eye" onClick={() => setShowPass(false)} />
                            </>
                            :
                            <>
                                <span>Enter Password</span><br />
                                <input type='text' placeholder='Enter Password' name='password' value={password}  onChange={(e) => setPassword(e.target.value)} required/>
                                <i className="fas fa-eye eye blue" id="eye" onClick={() => setShowPass(true)} />
                            </>
                    }

                </div>


               { update ? <div><Button className='button' as="input" type="submit" value="Add User" onClick={submitHandler}/></div>
                 : <div><Button className='button abc'  as="input" type="submit" value="Update" onClick={updateHandler}/></div> }


                {/* <div><Button className='button abc' as="input" type='button' value="Remove All" /></div> */}

            </div>

            </form>

            <div className='page'>Page {currentPage} of {totalPages}</div>

            <div className='table'>

                {
                    loading ? <div className='loading'>Please Wait...</div> :

                        <Table striped >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {visibleData.map((element) => {

                                    let index = data.findIndex(
                                        (item) => item.id === element.id,
                                    )

                                    return (

                                        <tr key={element.id}>

                                            <td>{index + 1}</td>
                                            <td>{element.username}</td>
                                            <td>{element.password}</td>
                                            <td>
                                                <i className="fa-solid fa-pen-to-square me-4" onClick={() => editHandler(element)}></i>
                                                <i className="fa-solid fa-trash" onClick={() => dispatch(deleteUser(element.id))} ></i>
                                            </td>
                                        </tr>

                                    )

                                })

                                }


                            </tbody>
                        </Table>
                }

        
            </div>

                <div className='pagination'>

                    <span className='page-button' onClick={navigatePrev}>Prev</span>
                  
                    {/* {
                        pages.map((element)=>{
                           return <span className='page-count' key={element} onClick={() => handleCurrentPage.call(null,element)}>{element}</span>
                        })
                    } */}

                    <span className='page-button' onClick={navigateNext}>Next</span>

          
                </div>
                    

        </div>
    )
}

export default Crud
