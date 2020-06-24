import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Link } from 'react-router-dom';


const ButtonsComponent = (props) => {


  const handleLogout = () => {
    localStorage.setItem("token", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("is_company", "");
    window.location.href = "http://localhost:3000/login";
  }

  return (
    <>
      {
        localStorage.getItem("token") ?
          < Button
           style={{backgroundColor:'#4682B4',marginRight:'20px'}}
            className="btn-neutral btn-icon "
            color="default"
            target="_blank"
            onClick={handleLogout}
          >
            <span className="nav-link-inner--text ml-1" style={{color:'orange'}}>
              Log out
                      </span>
          </Button > :
          <ButtonGroup>
            < Link to={'/company-register'}>
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                target="_blank"
              >
                <span className="nav-link-inner--text ml-1">
                  Sign up as company
                      </span>
              </Button>
            </Link >
            < Link to={'/register'}>
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                target="_blank"
              >
                <span className="nav-link-inner--text ml-1">
                  Sign up as customer
                      </span>
              </Button>
            </Link >
            < Link to={'/login'}>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                target="_blank"
              >
                <span className="nav-link-inner--text ml-1">
                  Log In
                      </span>
              </Button>
            </ Link >
          </ButtonGroup>
      }
    </>
  );
};

export default ButtonsComponent;
