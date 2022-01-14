import React, { useState, useEffect } from "react";
import axios from "axios"
import "../css/Login.css"

const Homepage = () => {
   
        const [item, setItem] = useState({
          username: "",
          mobile_number: "",
          email:"",
          address:""
        });
        const [items, setItems] = useState([
          {
            username: "",
            mobile_number: "",
            email:"",
            address:"",
            _id: "",
          },
        ]);
      
    
      
        useEffect(() => {
          fetch("https://somesh4321.herokuapp.com/items")
            .then((res) => {
              
                return res.json();
              
            })
            .then((jsonRes) => setItems(jsonRes))
            .catch((err) => console.log(err));
        }, [items]);
      
        function handleChange(event) {
          const { name, value } = event.target;
          setItem((prevInput) => {
            return {
              ...prevInput,
              [name]: value,
            };
          });
        }
      
        function addItem(event) {
          event.preventDefault();
          const newItem = {
            username: item.username,
            mobile_number: item.mobile_number,
            email: item.email,
            address:item.address
          };
      
          axios.post("https://somesh4321.herokuapp.com/newitem", newItem);
          console.log(newItem);
          alert("item added");
      
          setItem({
            username: "",
          mobile_number: "",
          email:"",
          address:""
          });
        }
      
        function deleteItem(id) {
          axios.delete("https://somesh4321.herokuapp.com/delete/" + id);
          alert("item deleted");
          console.log(`Deleted item with id ${id}`);
        }
      
       
      
       
      
        
    return (
        <div className="App">
      
        
<div className="left">
  <form className="form">
          <input
          type="text"
            onChange={handleChange}
            name="username"
            value={item.username}
            placeholder="Username"
          ></input>
          <br/>
          <input
          type="number"
            onChange={handleChange}
            name="mobile_number"
            value={item.mobile_number}
            placeholder="mobile_number"
          ></input>
                    <br/>


           <input
           type="email"
            onChange={handleChange}
            name="email"
            value={item.email}
            placeholder="email"
          ></input>
          <br/>


          <input
          type="text"
            onChange={handleChange}
            name="address"
            value={item.address}
            placeholder="address"
          ></input>
                    <br/>

          <button onClick={addItem}>ADD ITEM</button>
          </form>
          </div>
<div className="right">
<table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Username</th>
                <th>Mobile_number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Delete Button</th>

                
            </tr>
            </thead>

            <tbody>
     
  {items.map((item) => {
        return (
         
           
           <tr>
                <td>{item.username}</td>
                <td>{item.mobile_number}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
         <td> <button onClick={() => deleteItem(item._id)}>DELETE</button></td>  

         </tr> 
        );
      })}
      </tbody>

</table>
      </div>
    </div>
    )
}

export default Homepage
