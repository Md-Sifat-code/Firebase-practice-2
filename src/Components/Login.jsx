import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>This is login page</h1>
      <Link className="btn btn-primary" to={"/"}>
        Sign UP
      </Link>
    </div>
  );
}
