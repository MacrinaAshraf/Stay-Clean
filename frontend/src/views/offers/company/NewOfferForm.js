import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import Select from 'react-select';
import axios from "axios";



class NewOfferForm extends React.Component {
  state = {
    id: "",
    programs: [],
    selectedOption: "",
    offer: ""
  };

  componentDidMount() {
    axios.get("http://localhost:8000/user-api/company/program/",
      {
        headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res);
        let options = res.data;
        this.setState({ programs: options.map(program => ({ value: program.id, label: program.name })) })
        console.log(this.state.programs);
      });

    if (this.props.item) {
      const { id, program, offer } = this.props.item;
      this.setState({ id, program, offer });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOffer = e => {
    e.preventDefault();
    
    axios.post("http://localhost:8000/api/offers/",
      {
        program: this.state.selectedOption.value,
        offer: this.state.offer
      }, {
      headers: {
        Authorization:
          "Token " + localStorage.getItem("token"),
      },
    }).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editOffer = e => {
    e.preventDefault();
    axios.patch("http://localhost:8000/api/offers/" + this.state.id + "/",
      {
        offer: this.state.offer
      }, {
      headers: {
        Authorization:
          "Token " + localStorage.getItem("token"),
      },
    }).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Form onSubmit={this.props.item ? this.editOffer : this.createOffer}>
          
          { this.props.item ? <></> : <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={this.state.programs}
            /> }
          <br/>
        <FormGroup>
          <Input
            type="text"
            name="offer"
            placeholder="Enter your offer for the program"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.offer)}
          />
        </FormGroup>
        <Button color='logocolor'>Send</Button>
      </Form>
    );
  }
}

export default NewOfferForm;