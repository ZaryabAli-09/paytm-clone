import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();
  const [messageBanner, setMessageBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignUpBtn() {
    if (
      !usernameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      return setMessageBanner("All fields are required");
    }

    if (passwordRef.current.value.length < 8) {
      return setMessageBanner("Password must be at least 8 characters");
    }

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setMessageBanner(data.message);
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
      if (!res.ok) {
        setLoading(false);
        setMessageBanner(data.message);
      }
    } catch (error) {
      setMessageBanner(error);
    }
  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex items-center">
        <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
          <div className="text-4xl font-bold">Sign Up</div>
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your information to create an account{" "}
          </div>

          <InputBox
            inputRef={usernameRef}
            label={"Name"}
            placeholder={"Doe"}
            type={"text"}
          />
          <InputBox
            inputRef={emailRef}
            label={"Email"}
            placeholder={"johndoe@example.com"}
            type={"email"}
          />
          <InputBox
            inputRef={passwordRef}
            label={"Password"}
            placeholder={"123456"}
            type={"password"}
          />
          <Button
            label={loading ? "Loading..." : "Sign Up"}
            onClick={handleSignUpBtn}
          />
          {messageBanner && (
            <div className="text-xs bg-gray-300 w-full p-2 rounded">
              {messageBanner}
            </div>
          )}
          <div className="text-xs">
            have an account{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-blue-800 underline cursor-pointer"
            >
              sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
