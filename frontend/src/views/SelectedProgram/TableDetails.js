import axios from "axios";
import PayKey from "../../assets/payKey.js";
import React, { useState, useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import SimpleFooter from "components/Footers/SimpleFooter.js";
import StarRatingComponent from "react-star-rating-component";


function TableDetail ({ item }) {

    const [rating, setRating] = useState(item.rate);
    const [program, setProgram] = useState({});
    const [customer, setCustomer] = useState({});
    const [payKey, setPayKey] = useState(PayKey);
    const [programID, setProgramID] = useState(0);

    function handlePayOnline(token)
    {
        // console.log(token)
        // console.log(programID)

       
        axios.post("http://localhost:8000/api/selected/user_pay/", 
        {
            select: programID,
        } ).then(() => {
            getPrograms();
            getCompanies();
        });
        
    }

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


    function getPrograms(){
        axios
            .get('http://localhost:8000/api/programs/' + item.program + "/", {
                headers: {
                    Authorization:

                        "Token " + localStorage.getItem("token"),
                }
            })
            .then(res => {
                setProgram(program => res.data);

            });

    }
    function getCompanies(){
        axios
            .get('http://localhost:8000/user-api/customer/' + item.customer + "/", {
                headers: {
                    Authorization:

                        "Token " + localStorage.getItem("token"),
                }
            })
            .then(res => {
                setCustomer(customer => res.data);

            });

    }

    useEffect(() => {
        getPrograms();
        getCompanies();
    }, []);


    return (
        <tr>

            {
                sessionStorage.getItem("is_company") === "true" ?

                    (<>


                        <td>{customer.first_name + " " + customer.last_name}</td>
                        <td>{customer.phone}</td>

                        <td>{item.notes}</td>
                        <td>{item.address}</td>
                        <td>
                            <StarRatingComponent
                                name="rate"
                                starCount={5}
                                value={rating}
                                editable={false}
                            />

                        </td>
                        <td>{program.name}</td>


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
                        <td>{item.area}</td>
                        <td
                            onClick={e => {
                                // console.log(item.id);
                                setProgramID(item.id)
                            }}
                        >{
                            item.pay ?
                            (<>Yes</>)
                            :
                            (<>
                                <StripeCheckout
                                    stripeKey={payKey}
                                    token={handlePayOnline}


                                />
                            </>)
                            }</td>

                    </>)
            }
        </tr>
    );
};

export default TableDetail;