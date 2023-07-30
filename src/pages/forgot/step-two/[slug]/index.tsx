import { Spinner } from "phosphor-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Counter } from "../../../../components/Counter";
import { verifyCodeService } from "../../../../service/forgot.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ForgotStep2() {
  const { id } = useParams();
  const [codeInvalid, setCodeInvalid] = useState<boolean>(false);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [code1, setCode1] = useState<string>("");
  const [code2, setCode2] = useState<string>("");
  const [code3, setCode3] = useState<string>("");
  const [code4, setCode4] = useState<string>("");
  const router = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEmail(decodeURIComponent(id as string));
  }, [id]);

  const handleSendCode = async () => {
    try {
      setCodeInvalid(false);
      setLoading(true);
      const code = `${code1}${code2}${code3}${code4}`;
      const response = await verifyCodeService({ email, code });
      toast.success(response.message);
      const id = encodeURIComponent(response.userId);
      router(`/forgot/step-tree/${id}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
      setCodeInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeExpired) {
      router(-1);
      toast("Codígo expirado!", {
        icon: "👏",
      });
    }
  }, [timeExpired]);

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="bg-white border rounded-md flex flex-col justify-center pt-8 px-8 pb-4">
        <div className="flex flex-col gap-4 mb-8 items-center justify-center">
          <img src="/ICONE.png" alt="" className="w-[100px] h-[100px]" />
          <div className="border  p-2 rounded-md bg-neutral-200 w-96 text-center">
            <span>
              Digite o código enviado no seu e-mail: <b>{email}</b>
            </span>
          </div>
          <div className="flex justify-between w-full">
            <input
              type="text"
              className={`
              ${codeInvalid ? "border-red-500" : ""}
              border rounded-md p-3 w-20 placeholder:text-center placeholder:text-xl text-center`}
              placeholder="0"
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
            />
            <input
              type="text"
              className={`
              ${codeInvalid ? "border-red-500" : ""}
              border rounded-md p-3 w-20 placeholder:text-center placeholder:text-xl text-center`}
              placeholder="0"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
            />
            <input
              type="text"
              className={`
              ${codeInvalid ? "border-red-500" : ""}
              border rounded-md p-3 w-20 placeholder:text-center placeholder:text-xl text-center`}
              placeholder="0"
              value={code3}
              onChange={(e) => setCode3(e.target.value)}
            />
            <input
              type="text"
              className={`
              ${codeInvalid ? "border-red-500" : ""}
              border rounded-md p-3 w-20 placeholder:text-center placeholder:text-xl text-center`}
              placeholder="0"
              value={code4}
              onChange={(e) => setCode4(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="p-3 border bg-gray-800 rounded-md text-white w-96 disabled:cursor-not-allowed disabled:opacity-80"
            onClick={handleSendCode}
          >
            {loading ? <Spinner /> : "CONFIRMAR "}
          </button>
          <span>
            Codigo expira em{" "}
            <Counter
              onCountdownEnd={() => setTimeExpired(true)}
              initialSeconds={120}
            />
          </span>
          <span
            onClick={() => router(-1)}
            className="text-center underline text-gray-800 cursor-pointer"
          >
            Voltar
          </span>
        </div>
        <span className="text-center  text-neutral-600 text-xs">by GHTech</span>
      </div>
    </div>
  );
}
