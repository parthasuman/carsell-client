import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signIn } = useContext(AuthContext);

  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { repale: true });
  }

  const { providerLogin } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = (data) => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(data.email);
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: "password is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && <p role="alert">{errors.password?.message}</p>}
          </div>

          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
          <div>{loginError && <p>{loginError}</p>}</div>
        </form>
        <p>
          New to CarSell{" "}
          <Link className="text-primary" to="/signup">
            SignUp Here
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
        <p className="text-center text-red-500">Google only for buyer</p>
      </div>
    </div>
  );
};

export default Login;
