// import React, { useState } from "react";
// import "./components.css/login.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import bcrypt from "bcryptjs";


// // Login controller to handle user authentication
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       // Invalid credentials
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     // Valid credentials, create a session
//     const session = new Session({
//       user_id: user._id,
//     });
//     await session.save();
//     // Set session ID in a cookie
//     res.cookie("session_id", session._id, { httpOnly: true });
//     res.json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Validate token to verify session
// export const validateToken = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const token = req.cookies.session_id;
//     const session = await Session.findById(token);
//     if (!session || session.user.toString() !== user_id) {
//       return res.status(401).json({ message: "Invalid session" });
//     }
//     res.json({ message: "Session validated" });
//   } catch (error) {
//     console.error("Token validation error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// function Login() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     occupation: "",
//     location: "",
//     birthday: new Date()
//   });

//   const handleFormToggle = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       birthday: date,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password } = formData;
//     // Your logic for handling form submission based on whether it's login or signup
//     if (isLogin) {
//       // Handle login form submission
//       login({ email, password });
//     } else {
//       // Handle signup form submission
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2 className="log-sign">{isLogin ? "Login" : "Sign Up"}</h2>
//         <form className="login-form" onSubmit={handleSubmit}>
//           {/* Input fields */}
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           {!isLogin && (
//             <>
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="occupation">Occupation</label>
//                 <input
//                   type="text"
//                   id="occupation"
//                   name="occupation"
//                   value={formData.occupation}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location</label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="birthday">Birthday</label>
//                 <DatePicker
//                   className="dateBox"
//                   selected={formData.birthday}
//                   onChange={handleDateChange}
//                   dateFormat="MM/dd/yyyy"
//                   showYearDropdown
//                   scrollableYearDropdown
//                   maxDate={new Date(2025, 12, 31)}
//                   yearDropdownItemNumber={60}
//                 />
//               </div>
//             </>
//           )}
//           <div className="form-group">
//             <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
//           </div>
//         </form>
//         <p className="register">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             type="button"
//             className="login-button"
//             onClick={handleFormToggle}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;










// import React, { useState } from "react";
// import "./components.css/login.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function Login() {
//   const [isLogin, setIsLogin] = useState(true); // State to track whether login or signup form is displayed
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     occupation: "",
//     location: "",
//     birthday: new Date()
//     // Add additional fields for signup if needed
//   });

//   const handleFormToggle = () => {
//     setIsLogin(!isLogin); // Toggle between login and signup forms
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (date) => { // Define handleDateChange function
//     setFormData((prevData) => ({
//       ...prevData,
//       birthday: date
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logic for handling form submission based on whether it's login or signup
//     if (isLogin) {
//       // Handle login form submission
//     } else {
//       // Handle signup form submission
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
      
//       if (response.ok) {
//         // Authentication successful, store token in local storage
//         localStorage.setItem('token', data.token);
//         // Redirect user to dashboard or home page
//       } else {
//         // Authentication failed, display error message
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       // Handle other errors (e.g., network issues)
//     }
//   };

//   return (
//     <div className="login-page">
//     <div className="login-container">
//     <h2 className= "log-sign">{isLogin ? "Login" : "Sign Up"}</h2>
//     <form className="login-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="email">Email Address</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleLogin}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleLogin}
//           required
//         />
//       </div>
//       {!isLogin && (
//             <>
//       <div className="form-group">
//         <label htmlFor="firstName">First Name</label>
//         <input
//           type="text"
//           id="firstName"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="lastName">Last Name</label>
//         <input
//           type="text"
//           id="lastName"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="occupation">Occupation</label>
//         <input
//           type="text"
//           id="occupation"
//           name="occupation"
//           value={formData.occupation}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="location">Location</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//           <div className="form-group">
//             <label htmlFor="birthday">Birthday</label>
//             <DatePicker className= "dateBox"
//               selected={formData.birthday}
//               onChange={handleDateChange}
//               dateFormat="MM/dd/yyyy" // Customize date format
//               showYearDropdown
//               scrollableYearDropdown
//               maxDate={new Date(2025, 12, 31)}
//               yearDropdownItemNumber={60}
//             />
//           </div>
//           </>
//            )}
           


//       <div className="form-group">
//         <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
//       </div>
//     </form>
//     <p className="register">
//       {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//       <button 
//       type= "button"
//       className="login-button" 
//       onClick={handleFormToggle}>
//         {isLogin ? "Sign Up" : "Login"}
//       </button>
//     </p>
//   </div>
//   </div>
//   );
// }

// export default Login;











import React, { useState } from "react";
import "./components.css/login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bcrypt from "bcryptjs";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    birthday: new Date()
  });

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData; // Destructure email and password
    // Your logic for handling form submission based on whether it's login or signup
    if (isLogin) {
      // Handle login form submission
    } else {
      // Handle signup form submission
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="log-sign">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange} // Use handleInputChange for email
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange} // Use handleInputChange for password
              required
            />
          </div>
          {!isLogin && (
            <>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="occupation">Occupation</label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <DatePicker className= "dateBox"
              selected={formData.birthday}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy" // Customize date format
              showYearDropdown
              scrollableYearDropdown
              maxDate={new Date(2025, 12, 31)}
              yearDropdownItemNumber={60}
            />
          </div>
          </>
           )}
          <div className="form-group">
            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          </div>
        </form>
        <p className="register">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="login-button"
            onClick={handleFormToggle}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;