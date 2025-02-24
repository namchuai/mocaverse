import ReservationForm from "@/components/ReservationForm";
import { GetServerSideProps } from "next";

type Props = {
  code: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { code } = context.query as Props;
  return {
    props: {
      code: code || null,
    },
  };
};
export default function Page({ code }) {
  return <ReservationForm code={code} />;
}
