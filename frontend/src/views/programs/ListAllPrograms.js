import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgramCard from "./utils/ProgramCard.js";

import { Container, Row, Col, Input } from "reactstrap";

// core components
import Hero from "../IndexSections/Hero.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";


const List = () => {

    const [programs, setPrograms] = useState([])
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/programs/", {
            headers: {
                Authorization:
                    "Token " + localStorage.getItem("token"),
            },
        }).then(res => {
            setPrograms(res.data)
            setFiltered(res.data)
        });

    }, []);

    const handleChange = (e) => {

        let currentList = [];
        let newList = [];
        console.log(e.target.value)
        
        if (e.target.value !== "") {
            currentList = programs;

            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase();
                if(lc.includes(e.target.value.toLowerCase()))
                    return item;
            });
        } else {
            newList = programs;
        }
        setFiltered(newList);
    }

    return (
        <>
            <div>
                <DemoNavbar />
                <main>
                    <Hero />
                    <section className="section section-lg pt-lg-0 mt--200">
                        <Container>
                            <Input
                                type="text"
                                className="input"
                                onChange={handleChange}
                                placeholder="Search..."
                            />
                            {/* <SearchBar options={this.state.programs} /> */}
                            <br />
                            <Row className="justify-content-center">
                                <Col lg="12">
                                    <Row className="row-grid">
                                        {/* {console.log()} */}
                                        {filtered.map((item) => (
                                            <ProgramCard program={item} key={item.id} />
                                        ))}
                                    </Row>
                                </Col>

                            </Row>

                        </Container>
                    </section>

                    {/* <ListFiltered programs={programs} /> */}
                </main>

                <SimpleFooter />
            </div>
        </>
    );
}

export default List;
