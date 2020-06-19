import React, { useState, useEffect } from "react";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import TableDetails from "./TableDetails";
import axios from "axios";
import {
    Table
} from "reactstrap";

const SelectedProgram = (props) => {

    const [selectedProgram, setselectedProgram] = useState([]);


    useEffect(() => {
        axios
            .get('http://localhost:8000/api/selected/user_program/', {
                headers: {
                    Authorization:
                        "Token ebbc0d47e9b1dcbd3d71ed795e61d01c595279fd",
                }
            })
            .then(res => {
                setselectedProgram(selectedProgram.concat(res.data));
             
            });
            
         
    }, []);

    
    return (

        <div>
            
            <Table  >
                <thead>
                    <tr>
                        <th>note</th>
                        <th>address</th>
                        <th>rate</th>
                        <th>program name</th>
                      
                    
                    </tr>
                </thead>
                <tbody>
                    {!selectedProgram || selectedProgram.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Ops, no one here yet</b>
                            </td>
                        </tr>
                    ) : (
                            selectedProgram.map(item => (
                              <TableDetails key={item.id} item={item} />
                            ))
                        )}
                </tbody>
            </Table>
            <SimpleFooter />
        </div>

    );
};

export default SelectedProgram;