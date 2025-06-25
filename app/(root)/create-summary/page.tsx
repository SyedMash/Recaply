import Bounded from "@/components/Bounded";
import UploadForm from "@/components/UploadForm";
import { checkSummaryPermission } from "@/lib/actions/summary.action";

const Page = async () => {
  const summaryCount = await checkSummaryPermission();
  console.log(summaryCount);

  return (
    <Bounded className={"flex h-screen flex-col items-center justify-center"}>
      <UploadForm
        isAllowed={!summaryCount.success}
        message={summaryCount.message}
      />
      <p className={"mt-6 text-xl font-extrabold"}>
        ⚠️ You can only generate 1 time because YOU are in free plan
      </p>
    </Bounded>
  );
};
export default Page;
