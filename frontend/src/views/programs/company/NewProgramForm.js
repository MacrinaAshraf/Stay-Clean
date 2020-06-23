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
    images: [{}],
    // dummyImages: []
  };

  componentDidMount() {
    if (this.props.item) {
      console.log("hello" + this.props.item);
      const { id, name, description, duration, price } = this.props.item;
      this.setState({ id, name, description, duration, price });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    let dummy = [];
    for (let key in e.target.files) {
      if(key != "length")
        dummy.push(e.target.files[key])
    }
    this.setState({ images: dummy })
    console.log(e.target.files);
    
  };
  
  createProgram = e => {
    // console.log(this.state.images[0], this.state.images[0].name);
    e.preventDefault();
    let form_data = new FormData();
    for (let i = 0; i < this.state.images.length - 1; i++) {
      form_data.append('image_' + ( i + 1), this.state.images[i], this.state.images[i].name); 
    }
    form_data.append('name', this.state.name);
    form_data.append('description', this.state.description);
    form_data.append('duration', this.state.duration);
    form_data.append('price', this.state.price);
    
    
    // console.log(form_data.getAll);
    
    axios.post("http://localhost:8000/api/programs/", form_data, {
      headers: {
        Authorization:
          "Token " + localStorage.getItem("token"),
      },
    }).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editProgram = e => {
    e.preventDefault();
    axios.patch("http://localhost:8000/api/programs/" + this.state.id + "/", this.state, {
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

  render() {
    return (
      <Form onSubmit={this.props.item ? this.editProgram : this.createProgram}>
        <Label for="name">Add Images:</Label>
        <FormGroup>
          <Input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={this.handleImageChange}
            multiple
          />
        </FormGroup>
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
          <Label for="description">Description:</Label>
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