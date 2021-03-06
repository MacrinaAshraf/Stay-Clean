import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewProgramForm from "./NewProgramForm";

class NewProgramModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    render() {
        const create = this.props.create;

        var title = "Editing program";
        var button = 
        <Button 
            color="logocolor"
            size='lg'
            className="mt-4"
            outline type="button" 
            onClick={this.toggle}>
                Edit
        </Button>;
        if (create) {

            title = "Creating New program";

            button = (
                <Button
                    className="float-right"
                    onClick={this.toggle}
                    style={{ minWidth: "200px",marginTop:'-10%',marginRight:'85%', backgroundColor:'#4682B4',color:'orange' }}
                >
                    Create New program
                </Button>
            );
        }

        return (
            <Fragment>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                    <ModalBody>
                        <NewProgramForm
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            item={this.props.item}
                        />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default NewProgramModal;