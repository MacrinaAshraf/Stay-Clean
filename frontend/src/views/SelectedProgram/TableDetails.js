import React, { useState, useEffect } from "react";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";


const TableDetail = ({ item }) => {

    const [rating, setRating] = useState(item.rate);
    const [program, setProgram] = useState({});


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

                            "Token ebbc0d47e9b1dcbd3d71ed795e61d01c595279fd",
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
                        "Token ebbc0d47e9b1dcbd3d71ed795e61d01c595279fd",
                }
            })
            .then(res => {
                setProgram(res.data);

            });


    }, []);


    return (



        <tr >
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
        </tr>



    );
};

export default TableDetail;