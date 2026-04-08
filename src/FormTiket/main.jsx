import { createRoot } from "react-dom/client";
import FormMark from "./FormMark";
import "./mark.css";
import UserForm from "./UserForm";
import TicketOrder from "./TicketOrder";

createRoot(document.getElementById("root")).render(
    <div>
         <FormMark />
          <TicketOrder/>
          <UserForm/>

    </div>

);