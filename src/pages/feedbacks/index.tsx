import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseCookies } from "nookies";

import { Star } from "phosphor-react";
import { toast } from "react-hot-toast";

import { Row } from "../../components/Row";
import { Label } from "../../components/Label";
import { Col } from "../../components/Col";
import { Button } from "../../components/Button";
import { getPollsById } from "../polls-view/polls-view.service";
import { createNewFeedback, deleteFeedback } from "./feedbacks.service";
import { Spinner } from "../../components/Spinner";
import { EditorMessages } from "../../components/EditorMessages";
import { FeedbacksUsersView } from "./_components/feedbacks-users-view";
import { UserPolls } from "./_components/user-polls";
import { AuthContext } from "../../context/AuthContext";
import { SwitchTheme } from "../../components/SwitchTheme";

export default function Feedbacks() {
  const { "Dashboard.UserToken": Token } = parseCookies();
  const { user } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [data, setData] = useState<IPollsProps | undefined>();
  document.title = data?.title || "";

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openFeedbacks, setOpenFeedbacks] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openAddComments, setOpenAddComments] = useState(false);

  const open = () => setOpenFeedback(true);
  const close = () => setOpenFeedback(false);
  const openAllFeedbacks = () => setOpenFeedbacks(true);
  const closeAllFeedbacks = () => setOpenFeedbacks(false);
  const openComments = () => setOpenAddComments(true);
  const closeComments = () => setOpenAddComments(false);
  const isLogin = Token ? true : false;

  const handleStarHover = (index: number) => {
    if (clickedIndex === null) {
      setHoverIndex(index);
    }
  };

  const handleStarClick = (index: number) => {
    setClickedIndex(index);
  };

  async function fetchGetPollsById() {
    try {
      const response = await getPollsById(
        id as string,
        isLogin,
        user?.id as string
      );
      setData(response);
    } catch (err) {
      console.error(err);
      navigate("/not-found");
    }
  }

  useEffect(() => {
    if (user) {
      fetchGetPollsById();
    }
  }, [user, loadingList]);

  async function handleSubmit() {
    if (!name || !email || clickedIndex === null) {
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
      toast.success("Obrigado pelo seu feedback!");
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
      await deleteFeedback(id as string, idFeedback, user?.id as string);
      toast.success("Feedback deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Error ao deletar feedback");
    } finally {
      setLoadingDelete(false);
      setLoadingList(false);
    }
  }

  const isFeedbackVerify =
    data &&
    data?.feedbacks.length > 0 &&
    data?.feedbacks.some((feedback) => feedback.feedbackMessage.trim() !== "");

  return (
    <div className="bg-white w-screen h-screen py-8 dark:bg-neutral-800 overflow-auto">
      <div className="container  bg-neutral-300 dark:bg-neutral-700 rounded-md mx-auto p-8 overflow-auto ">
        <SwitchTheme fixed />

        <UserPolls data={data} />
        <div className="flex gap-8 mt-4">
          {!openFeedback && (
            <span className="underline cursor-pointer " onClick={open}>
              Enviar feedback
            </span>
          )}
          {(data?.isFeedbackPublic || isLogin) && isFeedbackVerify && (
            <div>
              {!openFeedback && data && data?.feedbacks?.length > 0 && (
                <span
                  className="underline cursor-pointer"
                  onClick={openAllFeedbacks}
                >
                  Ver feedbacks
                </span>
              )}
            </div>
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
                  className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-500 text-neutral-900 placeholder:text-neutral-900"
                  value={name}
                  placeholder="Digite seu nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col>
                <Label>Email</Label>
                <input
                  className="p-2 rounded-md bg-neutral-200 text-neutral-900 dark:bg-neutral-500 placeholder:text-neutral-900"
                  value={email}
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <span
                className="italic underline text-sm cursor-pointer hover:font-semibold"
                onClick={openAddComments ? closeComments : openComments}
              >
                {openAddComments
                  ? "Fechar caixa de cometários"
                  : "Adicionar comentário"}
              </span>
            </Row>

            {openAddComments && (
              <Row>
                <Col>
                  <div className="bg-neutral-300 dark:bg-neutral-500">
                    <EditorMessages
                      onChange={setFeedbackMessage}
                      value={feedbackMessage}
                    />
                  </div>
                </Col>
              </Row>
            )}
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
            {(data?.isFeedbackPublic || isLogin) && isFeedbackVerify ? (
              <Row>
                <span
                  className="underline cursor-pointer "
                  onClick={openFeedbacks ? closeAllFeedbacks : openAllFeedbacks}
                >
                  {openFeedbacks ? "Fechar feedbacks" : "Ver feedback"}
                </span>
              </Row>
            ) : null}
          </div>
        )}
        {openFeedbacks && (
          <FeedbacksUsersView
            Token={Token}
            data={data}
            deleteFeedback={fetchDeleteFeedback}
            loading={loadingDelete}
          />
        )}
      </div>
    </div>
  );
}
