import { Eye, Star } from "phosphor-react";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import PermissionGate from "../../../../components/PermissionGate";
import { Skeleton } from "../../../../components/Skeleton";

import { Table } from "../../../../components/Table";
import { PollsModalDelete } from "../polls-view-modal-delete";
import { deletePolls } from "../../polls-view.service";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../context/AuthContext";

interface IPollsTable {
  data: IPolls | undefined;
  handleLoading: (value: boolean) => void;
}

interface MediaCalculatorProps {
  media: number;
}

export const MediaCalculator: React.FC<MediaCalculatorProps> = ({ media }) => {
  const generateStarIcons = (filledStars: number): React.ReactNode[] => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(
        <Star
          key={i}
          size={14}
          weight={i < filledStars ? "fill" : "thin"}
          className={`cursor-pointer ${
            i < filledStars ? "text-yellow-400" : ""
          }`}
        />
      );
    }
    return starIcons;
  };

  const filledStars = Math.ceil(media);

  return (
    <div className="flex items-center justify-center gap-2">
      {generateStarIcons(filledStars)}
    </div>
  );
};

export function PollsTable({ data, handleLoading }: IPollsTable) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  async function fetchDeletePolls(id: string) {
    try {
      setLoading(true);
      handleLoading(true);
      if (user) {
        await deletePolls(user?.id, id);
      }
      toast.success("Enquete deletada com sucesso!");
    } catch (error) {
      toast.success("Erro ao deletar enquete!");
      console.error(error);
    } finally {
      handleLoading(false);
      setLoading(false);
    }
  }

  return (
    <>
      <Table.Root>
        <Table.Thead>
          <Table.Tr isHeader>
            <Table.Th>
              <Skeleton loading={false}>Criador</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={false}>Título</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={false}>
                <div className="flex items-center justify-center">
                  Qtd. de feedbacks
                </div>
              </Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={false}>
                <div className="flex items-center justify-center">
                  Qtd. de comentários
                </div>
              </Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={false}>
                <div className="flex items-center justify-center">
                  Média de avaliação
                </div>
              </Skeleton>
            </Table.Th>
            <PermissionGate permission="49HW3N8E4IQNM9QE1J0J4O1KWVDUWF">
              <Table.Th textAlign="text-end">
                <Skeleton loading={false}>Ações</Skeleton>
              </Table.Th>
            </PermissionGate>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.polls.map((item: IPollsProps) => {
              return (
                <Table.Tr key={item._id}>
                  <Table.Td>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.createdByAvatar}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <span>{item.createdByName}</span>
                        <span className="text-sm">{item.createdByEmail}</span>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td>{item.title}</Table.Td>
                  <Table.Td textAlign="text-center">
                    {item.feedbacks.length}
                  </Table.Td>
                  <Table.Td textAlign="text-center">
                    {
                      item.feedbacks.filter(
                        (feedback) => feedback.feedbackMessage.trim() !== ""
                      ).length
                    }
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      {item.feedbacks.length > 0 ? (
                        <MediaCalculator
                          media={
                            item.feedbacks.reduce(
                              (acc, feedback) => acc + feedback.assessment,
                              0
                            ) / item.feedbacks.length
                          }
                        />
                      ) : (
                        <div>N/A</div>
                      )}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex gap-1 justify-end">
                      <PermissionGate permission="49HW3N8E4IQNM9QE1J0J4O1KWVDUWF">
                        <ButtonIcon
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            window.open(`/feedbacks-view?id=${item._id}`)
                          }
                        >
                          <Eye size={22} />
                        </ButtonIcon>
                      </PermissionGate>
                      <PollsModalDelete
                        handleDelete={() => fetchDeletePolls(item._id)}
                        loading={loading}
                        name={item.title}
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
              );
            })}
        </Table.Tbody>
      </Table.Root>
    </>
  );
}
