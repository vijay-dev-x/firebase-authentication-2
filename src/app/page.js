"use client";
import { useState } from "react";
import { auth } from "../firebase/setup";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userInfo.user;
        const idToken = await user.getIdToken();
        console.log("user", user);

        toast.success("Logged in successfully");
        router.push("/home"); // Redirect to home page after login
        // set session stroage data--
        sessionStorage.setItem("jwt", user.accessToken);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: username });
        toast.success("User created");
        // router.push("/home"); // Redirect to a home page
        setIsLogin(true);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
  };

  return (
    <div className=" h-[100vh] bg-black text-white w-full flex flex-col justify-center items-center">
      <h1 className=" text-2xl my-10">
        {" "}
        {isLogin ? "Login YourSelf" : " Register yourself"}
      </h1>
      <form
        className=" flex items-center flex-col gap-5"
        onSubmit={handleRegister}
      >
        <div>
          <label>Email:</label>
          <input
            className=" border bg-transparent rounded-md outline-none mx-2 p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Username:</label>
            <input
              className=" border bg-transparent rounded-md outline-none mx-2 p-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label>Password:</label>
          <input
            className=" border bg-transparent rounded-md outline-none mx-2 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className=" px-5  font-semibold text-lg rounded-md py-2 hover:bg-green-800 bg-green-600 outline-none border-none"
          type="submit"
        >
          {isLogin ? "Login" : "Resigter"}
        </button>
        <div className=" flex gap-1 my-2">
          <p>
            {" "}
            {isLogin
              ? "Already have an account "
              : "Don,t have an account ?"}{" "}
          </p>
          <p
            onClick={() => setIsLogin(!isLogin)}
            className=" text-blue-500 underline cursor-pointer mx-2"
          >
            {isLogin ? "Sign up" : "Sign In"}
          </p>
        </div>
        {error && <p className=" text-red-400">{error}</p>}
      </form>
    </div>
  );
}
