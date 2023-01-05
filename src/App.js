/*2. Create a react js  client  which has an ajax request response interceptor.(You can use jquery ajax or axios but axios is preferred ) 
Functionality of the interceptor should be as follows
•	Intercept each request and add a header with name “auth” and set your phone number as value. This phone number should be fetched  from  sessionStorage of your  browser. If phone number is absent in sessionStorage do not set auth header to the request.  
•	Intercept each response for the data { “Error” : {“errcode ”:”some error code or error value”,”errormessage”:”Some Error message like failed to process data ” }} and show a notification message for the user using “errormessage” value in the above response data. You can also use other keys in the above message to make the notification better. 
•	Make a button(Button 1) in the react app to make a request to the above made server and call the api 
‘/getNumber . The phone number in the response should be saved to sessionStorage. 

•	Make another button (Button 2) in the react app to make a request to the above made server and call the api  ‘/getName . Your name in the response shall be displayed as you like.  
•	If I click button 2 before clicking  Button1, error notification should come */

import authFetch from "./Interceptors";
import { useEffect, useState } from "react";
import { Navbar, Container, NavbarBrand } from "react-bootstrap";

function App() {
  sessionStorage.setItem("Phone number", "7030488952");

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [push, setPush] = useState(false);

  const getNumber = async () => {
    const res = await authFetch("/getNumber");
    console.log(res.data);
    setPhone(res.data);
    setPush(true);
    //sessionStorage.setItem("Phone",res.data);
  };

  const getName = async () => {
    if (push) {
      const res = await authFetch("/getName");
      setName(res.data);
      console.log(res);
    } else setName("Error!");
  };

  return (
    <div className="App">
      <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
        <Container>
          <NavbarBrand href="#">React App</NavbarBrand>
        </Container>
      </Navbar>

      <br />
      <div className="row ">
        <div className="col-2 ">
          <input
            type="button"
            value="GET NUMBER"
            className="btn btn-info"
            onClick={getNumber}
          />
        </div>
        <div className="col-1">
          <input
            type="button"
            value="GET NAME"
            className="btn btn-info"
            onClick={getName}
          />
        </div>
      </div>
      <br />

      <div className="col-4 text-success">
        <b>{phone}</b>
      </div>
      <div
        className={
          push == false
            ? "col-4 text-danger"
            : "col-4 text-success"
        }
      >
        <b>{name}</b>
      </div>
    </div>
  );
}

export default App;
