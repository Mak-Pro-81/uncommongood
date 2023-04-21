import { SweepstakesTable } from "@/components";
import { GetStaticProps } from "next";
import { Routes } from "@/routes";
import { ISweepstake } from "@/interfaces";

interface ISweepstakesPageProps {
  allItems: ISweepstake[];
  counts: { total: number; completed: number }[];
}

const SweepstakesPage = ({
  allItems,
  counts,
}: ISweepstakesPageProps): JSX.Element => {
  return (
    <>
      <h2>Sweepstakes Page</h2>
      <br />
      <SweepstakesTable
        pagination
        allItems={allItems}
        filters
        counts={counts}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allResponse = await Promise.all([
      fetch(`${Routes.ROOT}${Routes.SWEEPSTAKES_COUNTS}`),
      fetch(
        `${Routes.ROOT}${Routes.SWEEPSTAKES}?page=${process.env.NEXT_PUBLIC_PAGE_INITIAL}&limit=${process.env.NEXT_PUBLIC_PER_PAGE_INITIAL}`
      ),
    ])
      .then((res) => {
        return Promise.all(res.map((r) => r.json()));
      })
      .then((data) => data);

    const [counts, allItems] = allResponse;

    const completedItemsLength = allItems.filter(
      (item: ISweepstake) => item.status === "completed"
    ).length;

    return {
      props: {
        allItems,
        counts,
      },
      revalidate: 618000,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default SweepstakesPage;
