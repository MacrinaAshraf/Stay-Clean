import React from "react";
import axios from "axios";
import ProgramCard from "../utils/ProgramCard.js";
import ConfirmRemovalModal from "./ConfirmRemovalModal.js";
import NewProgramModal from "./NewProgramModal";
import { Link } from 'react-router-dom';

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";


// core components
import Hero from "../../IndexSections/Hero.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
// import StarRatingComponent from "react-star-rating-component";
import SimpleFooter from "components/Footers/SimpleFooter.js";
// import NewProgramForm from "./NewProgramForm.js";


class ListCompanyPrograms extends React.Component {
    state = {
        programs: [],

    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        if (sessionStorage.getItem('is_company') === "false") {
            window.location.href = "http://localhost:3000/programs";
        }

        this.resetState();

    }


    getPrograms = () => {

        axios.get("http://127.0.0.1:8000/user-api/company/program/", {
            headers: {
                Authorization:
                    "Token " + localStorage.getItem("token"),
            },
        }).then(res => this.setState({ programs: res.data }));

    }

    resetState = () => {
        this.getPrograms();
    };

    render() {

        return (
            <>
                <div>
                    <DemoNavbar />

                    <main ref="main">

                        <Hero />

                        <section className="section section-lg pt-lg-0 mt--200">
                            <NewProgramModal create={true} resetState={this.resetState} />
                            <Container>

                                <Row className="justify-content-center">
                                    <Col lg="12">
                                        <Row className="row-grid">

                                            {this.state.programs.map((item) => (

                                                <ProgramCard program={item} key={item.id}
                                                >
                                                    <NewProgramModal
                                                        create={false}
                                                        item={item}
                                                        resetState={this.resetState}
                                                    />

                                                    <ConfirmRemovalModal
                                                        id={item.id}
                                                        resetState={this.resetState}
                                                    />
                                                    <Button 
                                                         color="logocolor"
                                                         size='lg'
                                                         className="mt-4"
                                                         outline type="button" 
                                                        href={'/programs/' + item.id}
                                                        >
                                                    

                                                  
                                                        view
                                                 
                                                   </Button>
                                                    <div>


                                                    </div>


                                                </ProgramCard>



                                            ))}

                                        </Row>

                                    </Col>

                                </Row>

                            </Container>
                        </section>
                    </main>

                    <SimpleFooter />
                </div>
            </>
        );
    }
}

export default ListCompanyPrograms;
