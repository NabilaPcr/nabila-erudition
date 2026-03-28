import { createRoot } from "react-dom/client";
import AboutMe from "./AboutMe";
import Container from "./Container";
import "./pearl.css";

createRoot(document.getElementById("root"))
    .render (
        <div className="card">
            <Container>
                 <AboutMe/>
            </Container>
           
        </div>
    )