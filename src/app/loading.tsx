import Error from "@/components/error";
import { Loading as LoadingSpinner } from "@/ui/loading";

export default function Loading() {
  return (
    <Error
      title={
        <div style={{ position: "relative", top: -20 }}>
          <LoadingSpinner />
        </div>
      }
      description="loading..."
    />
  );
}
