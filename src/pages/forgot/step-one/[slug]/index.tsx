import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotService } from "../../../../service/forgot.service";
import { NavLink } from "react-router-dom";
import { Spinner } from "../../../../components/Spinner";

export default function ForgotStep1() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notEmail, setNotEmail] = useState(false);
  const router = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendCode = async () => {
    setNotEmail(false);
    try {
      setLoading(true);
      const response = await forgotService({ email });
      toast.success(response.message);
      const encodedEmail = encodeURIComponent(email);
      router(`/forgot/step-two/${encodedEmail}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.error);
      setNotEmail(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-green-600 ">
      <div className="bg-white border rounded-sm flex flex-col justify-center pt-8 px-8 pb-4">
        <div className="flex flex-col gap-4 mb-8 items-center justify-center">
          <img src="/ICONE.png" alt="" className="w-[100px] h-[100px]" />
          <div className="border  p-2 rounded-sm bg-neutral-200 w-96 text-center">
            <span>
              Enviaremos um código para o e-mail caso ele exista em nossa base
              de dados.
            </span>
          </div>
          <input
            type="email"
            className={`
            ${notEmail ? "border-red-500" : ""}
            border rounded-sm p-3 w-96`}
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
          />

          <button
            disabled={loading}
            className="p-3 border bg-green-600 hover:bg-gray-900 rounded-sm text-white w-96 disabled:cursor-not-allowed disabled:opacity-80"
            onClick={handleSendCode}
          >
            {loading ? <Spinner /> : "ENVIAR CÓDIGO "}
          </button>
          <NavLink to="/" className="text-center underline text-green-600">
            Fazer login
          </NavLink>
        </div>
        <span className="text-center  text-neutral-600 text-xs">by GHTech</span>
      </div>
    </div>
  );
}
