import { useState, useRef } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSignIn } from "../store/store";
export function SignIn() {
  const user = useSelector((state) => state.user);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageBanner, setMessageBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignInBtn() {
    if (!emailRef.current.value || !passwordRef.current.value) {
      return setMessageBanner("All fields are required");
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setMessageBanner(data.message);
        dispatch(userSignIn(data));
        setTimeout(() => {
          navigate("/dashboard");
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
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify -center">
        <div className="bg-white rounded-lg w-80 text-center p-2 px-4 h-max">
          <div className="text-4xl font-bold">Sign In</div>
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your credentials to access your account
          </div>

          <InputBox
            inputRef={emailRef}
            label={"Email"}
            type={"email"}
            placeholder={"johndoe@example.com"}
          />
          <InputBox
            inputRef={passwordRef}
            label={"Password"}
            type={"password"}
            placeholder={"123456"}
          />
          <Button
            label={loading ? "Loading..." : "Sign In"}
            onClick={handleSignInBtn}
          />
          {messageBanner && (
            <div className="text-xs bg-gray-300 w-full p-2 rounded">
              {messageBanner}
            </div>
          )}
          <div className="text-xs">
            don't have an account{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-800 underline cursor-pointer"
            >
              sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
