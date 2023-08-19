import { useEffect, useState } from "react";
import { Star } from "phosphor-react";
import { Row } from "../../components/Row";
import { Label } from "../../components/Label";
import { Col } from "../../components/Col";
import { Button } from "../../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPollsById } from "../polls-view/polls-view.service";
import { createNewFeedback, deleteFeedback } from "./feedbacks.service";
import { Spinner } from "../../components/Spinner";
import { parseCookies } from "nookies";
import PermissionGate from "../../components/PermissionGate";
import { FeedbacksModalDelete } from "./_components/feedbacks-modal-delete";
import { toast } from "react-hot-toast";

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (isToday) {
    return `Hoje às ${hours}:${minutes}`;
  } else {
    return `${date.toLocaleDateString()} às ${hours}:${minutes}`;
  }
};

export default function Feedbacks() {
  const { "Dashboard.UserToken": Token } = parseCookies();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openFeedbacks, setOpenFeedbacks] = useState(false);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IPollsProps | undefined>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const open = () => setOpenFeedback(true);
  const close = () => setOpenFeedback(false);
  const openAllFeedbacks = () => setOpenFeedbacks(true);
  const closeAllFeedbacks = () => setOpenFeedbacks(false);

  const handleStarHover = (index: number) => {
    if (clickedIndex === null) {
      setHoverIndex(index);
    }
  };

  const handleStarClick = (index: number) => {
    setClickedIndex(index);
  };

  document.title = data?.title || "";

  async function fetchGetPollsById() {
    try {
      const response = await getPollsById(id as string);
      setData(response);
    } catch (err) {
      console.error(err);
      navigate("/not-found");
    }
  }

  useEffect(() => {
    fetchGetPollsById();
  }, [loadingList]);

  async function handleSubmit() {
    if (!name || !email || !feedbackMessage || clickedIndex === null) {
      toast.error("Preencha todos os campos e selecione uma avaliação.");
      return;
    }

    const payload = {
      name,
      email,
      feedbackMessage,
      assessment: clickedIndex + 1,
    };

    try {
      setLoading(true);
      setLoadingList(true);
      await createNewFeedback(id as string, payload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingList(false);
    }
  }

  async function fetchDeleteFeedback(idFeedback: string) {
    try {
      setLoadingList(true);
      setLoadingDelete(true);
      await deleteFeedback(id as string, idFeedback);
      toast.success("Feedback deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Error ao deletar feedback");
    } finally {
      setLoadingDelete(false);
      setLoadingList(false);
    }
  }

  return (
    <div className="bg-green-800 w-screen h-screen py-8  text-neutral-800 overflow-auto">
      <div className="container  bg-green-900 rounded-md mx-auto p-8 overflow-auto text-neutral-300">
        <div className="flex items-center gap-4">
          <img
            src={data?.createdByAvatar}
            className="h-10 w-100 rounded-full"
            alt=""
          />
          <div className="flex flex-col py-2">
            <span className="text-xl">
              <b>{data?.title}</b>
            </span>
            <span className="text-sm">
              {formatDate(data?.createdAt as string)}
            </span>
          </div>
        </div>
        <div
          className="mt-2 "
          dangerouslySetInnerHTML={{
            __html: data?.description || "",
          }}
        />
        <div className="flex gap-8 mt-4">
          {!openFeedback && (
            <span
              className="underline cursor-pointer text-neutral-300"
              onClick={open}
            >
              Enviar feedback
            </span>
          )}
          {!openFeedback && data && data?.feedbacks?.length > 0 && (
            <span
              className="underline cursor-pointer text-neutral-300"
              onClick={openAllFeedbacks}
            >
              Ver feedbacks
            </span>
          )}
        </div>
        {openFeedback && (
          <div className="flex flex-col gap-2 mt-8">
            <Label>Avaliação</Label>
            <div className="flex gap-2 items-center">
              {[0, 1, 2, 3, 4].map((index) => (
                <Star
                  key={index}
                  size={32}
                  weight={
                    (clickedIndex !== null && index <= clickedIndex) ||
                    (hoverIndex !== null && index <= hoverIndex)
                      ? "fill"
                      : "thin"
                  }
                  className={`cursor-pointer ${
                    (clickedIndex !== null && index <= clickedIndex) ||
                    (hoverIndex !== null && index <= hoverIndex)
                      ? "text-yellow-400"
                      : ""
                  }`}
                  onMouseEnter={() => handleStarHover(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            <Row>
              <Col>
                <Label>Nome</Label>
                <input
                  className="p-2 rounded-md bg-neutral-200 text-neutral-900 placeholder:text-neutral-900"
                  value={name}
                  placeholder="Digite seu nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col>
                <Label>Email</Label>
                <input
                  className="p-2 rounded-md bg-neutral-200 text-neutral-900 placeholder:text-neutral-900"
                  value={email}
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <textarea
                  rows={5}
                  placeholder="Escreva sua menssagem"
                  className="rounded-md bg-neutral-200 text-neutral-900 placeholder:text-neutral-900 p-2"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="justify-end mt-2">
              <Button variant="danger" onClick={close}>
                Cancelar
              </Button>
              <Button
                variant="success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Enviar feedback"}
              </Button>
            </Row>
            <Row>
              <span
                className="underline cursor-pointer text-neutral-300"
                onClick={openFeedbacks ? closeAllFeedbacks : openAllFeedbacks}
              >
                {openFeedbacks ? "Fechar feedbacks" : "Ver feedback"}
              </span>
            </Row>
          </div>
        )}
        {openFeedbacks && (
          <div className="max-h-[250px] overflow-auto mt-4">
            {data?.feedbacks.map((item: IFeedback) => {
              const firstLetter = item.name.charAt(0).toUpperCase();
              return (
                <div
                  key={item._id}
                  className="bg-green-800 rounded-md mt-2 p-2 text-neutral-300"
                >
                  <div className="flex items-center  gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xl">
                      {firstLetter}
                    </div>
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-sm">{item.email}</span>
                    </div>

                    <div className="flex-1 border-l pl-4">
                      {item.feedbackMessage}
                    </div>
                    {Token && (
                      <div className="pr-4">
                        <PermissionGate permission="9TLTS6BVTFVWCLX9CPYJKXAZ9HDUXA">
                          <FeedbacksModalDelete
                            handleDelete={() =>
                              fetchDeleteFeedback(item._id as string)
                            }
                            name={item.name}
                            loading={loadingDelete}
                          />
                        </PermissionGate>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
