import { Skeleton } from "../../../../components/Skeleton";
import { formatDate } from "../../../../utils/FormatDateAndString";

export function UserPolls({ data, loading = true }: IUserPolls) {
  return (
    <div>
      <div className="flex items-center gap-4">
        {loading && (
          <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse "></div>
        )}
        <img
          src={data?.createdByAvatar}
          className="h-10 w-100 rounded-full"
          alt=""
        />
        <div className="flex flex-col py-2">
          <span className="text-lg">
            <Skeleton loading={loading}>
              <b>{data?.createdByName ?? "carregando"}</b>
            </Skeleton>
          </span>
          <span className="text-sm">
            <Skeleton loading={loading}>
              {formatDate(data?.createdAt as string) ?? "Carregando"}
            </Skeleton>
          </span>
        </div>
      </div>
      <div>
        <span className="text-2xl">
          <Skeleton loading={loading}>{data?.title ?? "carregando"}</Skeleton>
        </span>
      </div>
      <Skeleton loading={loading}>
        <div
          className="mt-2 "
          dangerouslySetInnerHTML={{
            __html: data?.description || "",
          }}
        />
      </Skeleton>
    </div>
  );
}
