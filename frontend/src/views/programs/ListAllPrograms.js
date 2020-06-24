import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgramCard from "./utils/ProgramCard.js";

import { Container, Row, Col, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

// core components
import Hero from "../IndexSections/Hero.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";


const List = () => {

    const [programs, setPrograms] = useState([])
    const [filtered, setFiltered] = useState([]);
    const [isOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!isOpen);

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


    const handleClick = (e) => {
        console.log(e.target.value);

        if (e.target.value === "lowest") {
            const compareLowest = (a, b) => {
                if (parseInt(a.price) < parseInt(b.price)) {
                    return -1;
                }
                if (parseInt(a.price) > parseInt(b.price)) {
                    return 1;
                }
            }
            let list = filtered;
            list.sort(compareLowest);
            setFiltered(list);
        }
        else if (e.target.value === "highest") {
            const compareHighest = (a, b) => {
                if (parseInt(a.price) > parseInt(b.price)) {
                    return -1;
                }
                if (parseInt(a.price) < parseInt(b.price)) {
                    return 1;
                }
            }
            let list = filtered;
            list.sort(compareHighest);
            setFiltered(list);
        }
    }

    const handleChange = (e) => {

        let currentList = [];
        let newList = [];
        console.log(e.target.value)

        if (e.target.value !== "") {
            currentList = programs;

            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase();
                if (lc.includes(e.target.value.toLowerCase()))
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
                            <div>
                                <Input
                                    type="text"
                                    className="input"
                                    onChange={handleChange}
                                    placeholder="Search..."
                                />
                                <br />
                                <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                                    <DropdownToggle color="secondary" caret size="sm">
                                        Sort by price
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem value="lowest" onClick={handleClick}>Lowest</DropdownItem>
                                        <DropdownItem value="highest" onClick={handleClick}>Highest</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                            <br />
                            <Row className="justify-content-center">
                                <Col lg="12">
                                    <Row className="row-grid">
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
