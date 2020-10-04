// import React from "react";
// import axios from "axios";

// export default function Login() {
//   onChangeValue = (event) => {
//     this.setState({ username: event.target.value });
//     // console.log(this.state);
//   };

//   handleSubmit((e) => {
//     e.preventDefault();

//     const url = "http://localhost:4000/login";
//     const user = {
//       name: this.state.username,
//     };

//     const headers = {
//       "Content-Type": "application/json",
//       // Authorization: "JWT fefege...",
//     };

//     axios
//       .post(url, user, {
//         headers: headers,
//       })
//       .then((res) => {
//         // console.log(res);
//         if (res.status === 200) this.setState({ isLoggedIn: true });
//         localStorage.setItem("accessToken", res.data.accessToken);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   return (
//     <>
//       <h2>log in</h2>
//       <form onSubmit={handleSubmit}>
//         <label>User name</label>
//         <input
//           type="text"
//           placeholder="User name"
//           onChange={onChangeValue}
//           value={this.state.value}
//         />
//         <button type="button" onClick={handleSubmit}>
//           log in
//         </button>
//       </form>
//     </>
//   );
// }
