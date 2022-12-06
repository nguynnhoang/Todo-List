import React from "react";
import { Button } from "reactstrap";

const Footer = () => {
    return (
        <div>
            <div>2 items left</div>
            <div>
                <Button color="danger">All</Button>
                <Button color="danger">Active</Button>
                <Button color="danger">All completed</Button>
            </div>
            <div>
                <Button color="danger">Clear completed</Button>
            </div>
        </div>
    )
}

export default Footer;