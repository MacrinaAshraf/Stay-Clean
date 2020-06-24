import React, { useState, useEffect } from "react";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";


const TableDetail = ({ item }) => {

    const [rating, setRating] = useState(item.rate);
    const [program, setProgram] = useState({});
    const [customer, setCustomer] = useState({});



    const onStarClick = async (nextValue) => {

        setRating(nextValue);
        console.log(rating, nextValue);
        try {
            axios.patch(
                "http://localhost:8000/api/selected/" + item.id + "/",
                { fieldName: "rate", fieldValue: nextValue },
                {
                    headers: {
                        Authorization:

                            "Token " + localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/programs/' + item.program + "/", {
                headers: {
                    Authorization:

                        "Token " + localStorage.getItem("token"),
                }
            })
            .then(res => {
                setProgram(res.data);

            });


    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/user-api/customer/' + item.customer + "/", {
                headers: {
                    Authorization:

                        "Token " + localStorage.getItem("token"),
                }
            })
            .then(res => {
                setCustomer(res.data);

            });


    }, []);


    return (
       <tr>
        
        {
            sessionStorage.getItem("is_company") ==="true"?

               ( <>


                    <td>{customer.first_name + " " + customer.last_name}</td>
                    <td>{customer.phone}</td>

                    <td>{item.notes}</td>
                    <td>{item.address}</td>
                    <td>
                        <StarRatingComponent
                            name="rate"
                            starCount={5}
                            value={rating}
                            editable = {false}
                        />

                    </td>
                    <td>{program.name}</td>
                    <td>{program.price}</td>

                </>
               )
                : (<>


                    <td>{item.notes}</td>
                    <td>{item.address}</td>
                    <td>
                        <StarRatingComponent
                            name="rate"
                            starCount={5}
                            value={rating}
                            onStarClick={onStarClick}
                        />

                    </td>
                    <td>{program.name}</td>
                    <td>{program.price}</td>

                </>)
        }
    </tr>
    );
};

export default TableDetail;