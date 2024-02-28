import { useGoogleLogin } from "@react-oauth/google";

const AuthButton = () => {
  const login = useGoogleLogin({
    onSuccess: () => alert("Success"),
  });
  return <div onClick={() => login()} className="auth"></div>;
};

export default AuthButton;
