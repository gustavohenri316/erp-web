import { Skeleton } from "../Skeleton";

export function Label({ children, loading, ...rest }: LabelProps) {
  return (
    <div>
      <Skeleton loading={loading as boolean}>
        <label {...rest} className="">
          {children}
        </label>
      </Skeleton>
    </div>
  );
}
