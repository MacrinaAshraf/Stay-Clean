import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    Container,
} from "reactstrap";

import DemoNavbar from "./Navbars/DemoNavbar";
import SimpleFooter from "./Footers/SimpleFooter";

const Error = () => {

    return (
        <>
            <DemoNavbar />
            <main>
                <section className="section section-shaped section-lg">
                    <Container className="pt-lg-7">
                        <Card>
                            {/* <h1>401 Error</h1> */}
                            <CardHeader>
                                Your account is not activated yet because our admins
                                are still reviewing your policy, Please Check back in 2 days!
                            </CardHeader>
                        </Card>
                    </Container>
                </section>
            </main>
            <SimpleFooter />
        </>
    );

}

export default Error;
