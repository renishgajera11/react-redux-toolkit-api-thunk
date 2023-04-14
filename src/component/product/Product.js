import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'

function Product() {
    const [apiData, setapiData] = useState([]);
    const get = async () => {
        await axios.get("https://fakestoreapi.com/products").then((r) => setapiData(r.data));
    };

    useEffect(() => {
        get();
    }, []);


    console.log(apiData);

    return (
        <div>

            <p>hello</p>
            {/* <p>{apidata.id}</p>  */}

            <div>
                <Table striped >
                    {/* <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead> */}

                    <tbody>

                        {apiData.map((element) => {

                            let index = apiData.findIndex(
                                (item) => item.id === element.id,
                            )

                            return (

                                <tr key={element.id}>

                                    <td>{index + 1}</td>
                                    <td>{element.price}</td>
                                    <td>{element.title}</td>
                                    <td>{element.category}</td>
                                    <td><img src={element.image}></img></td>
                              
                                </tr>

                            )

                        })

                        }


                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default Product
