import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name:"" ,email: "", password: "" ,cpassword:""});
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let json = await response.json();
    console.log(json);
      if(json.success){
         //redirect
      localStorage.setItem("token", json.jwtData); //storing token in local storage
      navigate("/");
      props.showAlert("account created successfully","success")
      }
      else{
        props.showAlert("invalid credentials","danger")
      }
      
     
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className='my-3'>Create an account to use iNotebook</h3>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">name</label>
    <input type="text" className="form-control" id="name"  name="name"aria-describedby="emailHelp"  onChange={handleChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Create account</button>
</form>
    </div>
  )
}

export default SignUp
