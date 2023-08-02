import { Spinner } from "../../../../components/Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { newPasswordService } from "../../../../service/forgot.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ForgotStep3() {
  const { id } = useParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useNavigate();
  const params = decodeURIComponent(id as string);

  const handleSendCode = async () => {
    if (password !== confirmPassword) {
      toast.error("A senhas digitadas não conferem.");
    } else {
      try {
        setLoading(true);
        const response = await newPasswordService({ password, id: params });
        toast.success(response.message);
        router("/");
      } catch (err: any) {
        console.error(err);
        toast.error(err.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-green-600 dark:bg-green-950">
      <div className="bg-neutral-100 border rounded-md flex flex-col justify-center pt-8 px-8 pb-4">
        <div className="flex flex-col gap-4 mb-8 items-center justify-center">
          <img src="/ICONE.png" alt="" className="w-[100px] h-[100px]" />

          <input
            type="password"
            className="border rounded-md p-3 w-96"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="border rounded-md p-3 w-96"
            placeholder="Confirme sua nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="p-3 border bg-green-600 dark:bg-green-950 hover:bg-gray-900 rounded-md text-neutral-100 w-96 disabled:cursor-not-allowed disabled:opacity-80"
            onClick={handleSendCode}
          >
            {loading ? <Spinner /> : " CONFIRMAR "}
          </button>
        </div>
        <span className="text-center  text-neutral-600 text-xs">by GHTech</span>
      </div>
    </div>
  );
}
