import { formatDate } from "../../../../utils/FormatDateAndString";

export function UserPolls({ data }: IUserPolls) {
  return (
    <div>
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
    </div>
  );
}
