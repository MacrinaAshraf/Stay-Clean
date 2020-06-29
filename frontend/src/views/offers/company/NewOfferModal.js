import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewOfferForm from "./NewOfferForm";

class NewOfferModal extends Component {
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

        var title = "Editing offer";
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

            title = "Add new offer";

            button = (
                <Button
                    className="float-right"
                    onClick={this.toggle}
                    style={{ minWidth: "200px",marginTop:'-10%',marginRight:'85%', backgroundColor:'#4682B4',color:'orange' }}
                >
                    Add new offer
                </Button>
            );
        }

        return (
            <Fragment>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                    <ModalBody>
                        <NewOfferForm
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

export default NewOfferModal;