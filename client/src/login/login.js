// import React from "react";

// export default function Login() {
//      onChangeValue = (event) => {
//     this.setState({ username: event.target.value });
//     // console.log(this.state);
//   };

//   handleSubmit(e) {
//     e.preventDefault();

//     const url = "http://localhost:4000/login";
//     const user = {
//       username: this.state.username,
//     };

//     const headers = {
//       "Content-Type": "application/json",
//       // Authorization: "JWT fefege...",
//     };
//   return (
//     <>
//       <h2>log in</h2>
//       <form onSubmit={this.handleSubmit}>
//         <label>User name</label>
//         <input
//           type="text"
//           placeholder="User name"
//           onChange={this.onChangeValue}
//           value={this.state.value}
//         />
//         <button type="button" onClick={this.handleSubmit}>
//           log in
//         </button>
//       </form>
//     </>
//   );
// }
