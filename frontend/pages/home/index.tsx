import React from "react";
import NavbarHome from "@/components/global/NavbarHome";
import '../../components/project/config.css'
import {Card, CardHeader, CardBody, Image, Tabs, Tab,} from "@nextui-org/react";

const Home = () => {
    return(
        <div>
            <NavbarHome />
            <section>
                <div className="flex w-full flex-col mt-12">
                    <Tabs aria-label="Options">
                        <Tab key="photos" title="Personal">
                        <Card>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </CardBody>
                        </Card>  
                        </Tab>
                        <Tab key="music" title="TeamSpace">
                        <Card>
                            <CardBody>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </CardBody>
                        </Card>  
                        </Tab>
                    </Tabs>
                </div>  
            </section>
        </div>
    )
}

export default Home