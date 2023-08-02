import  { useState, useEffect, useRef, ChangeEvent } from "react";
import { Spinner } from "../../../../components/Spinner";
import toast from "react-hot-toast";
import { Counter } from "../../../../components/Counter";
import { verifyCodeService } from "../../../../service/forgot.service";
import { useNavigate, useParams } from "react-router-dom";


export default function ForgotStep2() {
  const { id } = useParams<{ id: string }>();
  const [codeInvalid, setCodeInvalid] = useState<boolean>(false);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const router = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEmail(decodeURIComponent(id as string));
  }, [id]);

  const handleSendCode = async () => {
    try {
      setCodeInvalid(false);
      setLoading(true);
      const joinedCode = code.join("");
      const response = await verifyCodeService({ email, code: joinedCode });
      toast.success(response.message);
      const encodedUserId = encodeURIComponent(response.userId);
      router(`/forgot/step-tree/${encodedUserId}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setCodeInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeExpired) {
      router(-1);
      toast("Código expirado!", {
        icon: "👏",
      });
    }
  }, [timeExpired]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value.length === 0 && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (index < 3 && value.length === 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-green-600">
      <div className="bg-white border rounded-sm flex flex-col justify-center pt-8 px-8 pb-4">
        <div className="flex flex-col gap-4 mb-8 items-center justify-center">
          <img src="/ICONE.png" alt="" className="w-[100px] h-[100px]" />
          <div className="border  p-2 rounded-sm bg-neutral-200 w-96 text-center">
            <span>
              Digite o código enviado no seu e-mail: <b>{email}</b>
            </span>
          </div>
          <div className="flex justify-between w-full">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                className={`${
                  codeInvalid ? "border-red-500" : ""
                } border rounded-sm p-3 w-20 placeholder:text-center placeholder:text-xl text-center`}
                placeholder="0"
                value={value}
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                ref={(input: any) => (inputRefs.current[index] = input)}
              />
            ))}
          </div>
          <button
            disabled={loading}
            className="p-3 border bg-green-600 rounded-sm text-white w-96 disabled:cursor-not-allowed disabled:opacity-80"
            onClick={handleSendCode}
          >
            {loading ? <Spinner /> : "CONFIRMAR "}
          </button>
          <span>
            Código expira em{" "}
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
