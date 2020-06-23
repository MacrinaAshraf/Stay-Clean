import React from "react";
import axios from "axios";
import ProgramCard from "./utils/ProgramCard.js";
// import ConfirmRemovalModal from "./company/ConfirmRemovalModal.js/index.js";
// import NewProgramModal from "./company/NewProgramModal";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import Hero from "../IndexSections/Hero.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
// import StarRatingComponent from "react-star-rating-component";
import SimpleFooter from "components/Footers/SimpleFooter.js";
// import NewProgramForm from "./NewProgramForm.js";


class List extends React.Component {
    state = {
        programs: [],

    };

    componentDidMount() {
        // document.documentElement.scrollTop = 0;
        // document.scrollingElement.scrollTop = 0;
        // this.refs.main.scrollTop = 0;
        if(sessionStorage.getItem('is_company') === "true") {
            window.location.href = "http://localhost:3000/company-programs/";
        }
        this.resetState();

    }


    getPrograms = () => {

        axios.get("http://127.0.0.1:8000/api/programs/", {
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
                        {/* <NewProgramModal create={true} resetState={this.resetState} /> */}
                        <section className="section section-lg pt-lg-0 mt--200">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg="12">
                                        <Row className="row-grid">

                                            {this.state.programs.map((item) => (

                                                <ProgramCard program={item} key={item.id}/>
                                                // </ProgramCard>
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

export default List;
