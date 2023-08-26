import { parseCookies } from "nookies";
import { Spinner } from "../../components/Spinner";
import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { SHA256 } from "crypto-js";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function generateLargeHash() {
  const randomString =
    Math.random().toString(36).substring(2, 36) +
    Math.random().toString(36).substring(2, 36);

  const hash = SHA256(randomString).toString();

  return hash;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useNavigate();

  const { signIn } = useContext(AuthContext);

  async function handleSigIn() {
    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const largeHash = generateLargeHash();
  const { "Dashboard.UserToken": Token } = parseCookies();
  const { "Dashboard.UserToken-permissions": Permissions } = parseCookies();

  useEffect(() => {
    if (Token && Permissions) {
      router("/");
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [Token, Permissions]);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSigIn();
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner size={24} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-green-600 ">
      <div className="bg-neutral-100 border rounded-md flex flex-col justify-center pt-8 px-8 pb-4">
        <div className="flex flex-col gap-4 mb-8 items-center justify-center">
          <img src="/ICONE.png" alt="" className="w-[100px] h-[100px]" />
          <input
            type="email"
            className="border rounded-md p-3 w-96"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border rounded-md p-3 w-96"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            disabled={loading}
            className="p-3 border bg-green-600  hover:bg-green-800 rounded-md text-neutral-100 w-96 disabled:cursor-not-allowed disabled:opacity-80"
            onClick={handleSigIn}
          >
            {loading ? <Spinner /> : "Entrar "}
          </button>
          <NavLink
            to={`/forgot/step-one/${largeHash}`}
            className="text-center underline text-green-600"
          >
            Esqueci minha senha
          </NavLink>
        </div>
        <span className="text-center  text-neutral-600 text-xs">by GHTech</span>
      </div>
    </div>
  );
}
