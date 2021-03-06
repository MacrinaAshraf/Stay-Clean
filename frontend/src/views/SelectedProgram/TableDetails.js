import axios from "axios";
import React, { useState, useEffect } from "react";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import StarRatingComponent from "react-star-rating-component";

function TableDetail({ item }) {
  const [rating, setRating] = useState(item.rate);
  const [program, setProgram] = useState({});
  const [customer, setCustomer] = useState({});

  const onStarClick = async (nextValue) => {
    setRating(nextValue);
    // console.log(rating, nextValue);
    try {
      axios.patch(
        "http://localhost:8000/api/selected/" + item.id + "/",
        { rate: nextValue },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      // console.log(error);
    }
  };

  function getPrograms() {
    axios
      .get("http://localhost:8000/api/programs/" + item.program + "/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProgram((program) => res.data);
      });
  }
  function getCompanies() {
    axios
      .get("http://localhost:8000/user-api/customer/" + item.customer + "/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCustomer((customer) => res.data);
      });
  }

  useEffect(() => {
    getPrograms();
    getCompanies();
  }, []);

  return (
    <tr>
      {sessionStorage.getItem("is_company") === "true" ? (
        <>
          <td>{customer.first_name + " " + customer.last_name}</td>
          <td>{customer.phone}</td>
          <td>{program.name}</td>
          <td>{program.price}</td>
          <td> {item.address.split("/")[2]}</td>

          <td>
            <StarRatingComponent
              name="rate"
              starCount={5}
              value={rating}
              editable={false}
            />
          </td>

          <td>{item.pay ? <>Booked</> : <>{item.id + 4444}</>}</td>

          <td>
            {" "}
            <details>
              <summary>show</summary>
              <p>
                {" "}
                latitude: {item.address.split("/")[0]} <br />
                longitude: {item.address.split("/")[1]} <br />
                Date : {item.date.split("T")[0]} <br />
                Note: {item.notes}
              </p>
            </details>
          </td>
        </>
      ) : (
        <>
          <td>{program.name}</td>
          <td>{program.price}</td>
          <td>{item.address.split("/")[2]}</td>

          <td>
            <StarRatingComponent
              name="rate"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
            />
          </td>

          <td>
            {item.area}/5m<sup>2</sup>
          </td>
          <td>{item.pay ? <>Booked</> : <>{item.id + 4444}</>}</td>
          <td>
            <details>
              <summary>Show</summary>
              <p>
                {" "}
                latitude: {item.address.split("/")[0]} <br />
                longitude: {item.address.split("/")[1]} <br />
                Date: {item.date.split("T")[0]} <br />
                Notes: {item.notes}
              </p>
            </details>
          </td>
        
        </>
      )}
    </tr>
  );
}

export default TableDetail;
