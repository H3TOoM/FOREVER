import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      let data = {
        name: name,
        email: email,
        password: password
      }
      localStorage.setItem("userData", JSON.stringify(data));
      setState("Login");
      Swal.fire({
        title: "Good job!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonColor: '#000000'
      });
    } else {
      const storedData = localStorage.getItem("userData");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.email === email && parsedData.password === password) {
          await Swal.fire({
            title: "Welcome Back!",
            text: "Login successful!",
            icon: "success",
            confirmButtonColor: '#000000',
          });
          navigate("/")
          location.reload()

          // something is wrong
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Invalid credentials",
            icon: "error",
            confirmButtonColor: '#000000',
          });
        }

        // if user don't have an account
      } else {
        Swal.fire({
          title: "No Account Found",
          text: "Please sign up first.",
          icon: "warning",
          confirmButtonColor: '#000000',
        });
      }
    }
  };

  const toggleTypeLogin = () => {
    if (state === "Sign Up") {
      setState("Login");
    } else {
      setState("Sign Up");
    }
  }

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={onSubmitHandler}>
      <p
        className="prata-regular text-3xl">
        {state === "Sign Up" ? "Sign Up" : "Login"}
      </p>
      {
        state === "Sign Up" && (
          <input
            className="w-full px-3 py-2 border border-gray-800 outline-0"
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        )
      }
      <input
        className="w-full px-3 py-2 border border-gray-800 outline-0"
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required />
      <input
        className="w-full px-3 py-2 border border-gray-800 outline-0"
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">
          Forgot your password?
        </p>
        <p
          className="cursor-pointer"
          onClick={toggleTypeLogin}>{state === "Sign Up" ? "Login Here" : "Create account"}
        </p>
      </div>

      <button
        className="bg-black text-white font-light px-8 py-2 mt-4"
        type="submit">
        {state === "Sign Up" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
};

export default Login;