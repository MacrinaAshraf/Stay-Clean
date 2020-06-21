import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";



class NewProgramForm extends React.Component {
  state = {
    id: "",
    name: "",
    description: "",
    duration: "",
    price: "",
  };

  componentDidMount() {
    if (this.props.item) {
      console.log("hello"+this.props.item);
      const { id, name, description, duration, price } = this.props.item;
      this.setState({ id, name, description, duration, price });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createProgram = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/programs/", this.state, {
                      headers: {
                          Authorization:
                              "Token " + localStorage.getItem("token"),
                      },}).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editProgram = e => {
    e.preventDefault();
    axios.patch("http://localhost:8000/api/programs/"+ this.state.id+"/", this.state , {
      headers: {
          Authorization:
            "Token " + localStorage.getItem("token"),
      },}).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.item ? this.editProgram : this.createProgram}>
          <Label for="name">Name:</Label>
        <FormGroup> 
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">description:</Label>
          <Input
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="duration">duration:</Label>
          <Input
            type="number"
            name="duration"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.duration)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">price:</Label>
          <Input
            type="number"
            name="price"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.price)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewProgramForm;