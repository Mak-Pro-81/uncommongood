import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./SweepstakesTable.module.scss";
import { ISweepstake } from "@/interfaces";
import { currencyFormatter, dateTimeFromStampFormatter } from "@/helpers";
import { Routes } from "@/routes";
import { Chip, MainButton, Modal } from "@/components";
import { SweepstakesModalContent } from "./SweepstakesModalContent";
import { SweepstakesModalContentType } from "@/types";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleModal } from "@/store/slices/modalSlice";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const paginationPages: (number | string)[] = [
  `${process.env.NEXT_PUBLIC_PER_PAGE_INITIAL}`,
  15,
  20,
  25,
  "all",
];
const dataTableFilters: string[] = ["all", "active", "inactive"];

interface ISweepstakesTable {
  pagination?: boolean;
  filters?: boolean;
  allItems: ISweepstake[];
  counts: { total: number; completed: number }[];
}

export const SweepstakesTable = ({
  pagination,
  filters,
  allItems,
  counts,
}: ISweepstakesTable): JSX.Element => {
  const { showModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const [{ total, completed }] = counts;
  const [filteredTableRows, setFilteredTableRows] =
    useState<ISweepstake[]>(allItems);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<string | number>(
    `${process.env.PER_PAGE_INITIAL}`
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [modalContent, setModalContent] = useState<ReactJSXElement>(<></>);
  const [rowId, setRowId] = useState<string>("");

  // handle filters
  const handleFilter = (value: string) => {
    setActiveFilter(value);
  };

  // set table filters
  const tableFilters = dataTableFilters.map((filter) => (
    <li
      key={filter}
      className={filter === activeFilter ? styles.item__active : ""}
    >
      <button type="button" onClick={() => handleFilter(filter)}>
        {filter}
      </button>
    </li>
  ));

  // table pagination
  const pages = paginationPages.map((page) => (
    <option value={page} key={page}>
      {page}
    </option>
  ));

  const rowsPerpageRef = useRef<HTMLSelectElement>(null);
  const handleRowsPerPage = async () => {
    setRowsPerPage(rowsPerpageRef.current!.value);
  };

  // switch pages
  const handleSwitchPage = (direction: string) => {
    setCurrentPage((prev) => {
      if (direction === "forward") {
        if (prev < totalPages) {
          return (prev = prev += 1);
        } else {
          return (prev = prev);
        }
      } else {
        return (prev -= 1);
      }
    });
  };

  const statusHandler = (id: string) => {
    setRowId(id);
  };

  const modalHandler = (
    type: SweepstakesModalContentType,
    link?: string,
    id?: string
  ) => {
    setModalContent(
      <SweepstakesModalContent
        id={id}
        type={type}
        link={link}
        statusClick={(id) => statusHandler(id)}
      />
    );
    dispatch(toggleModal(true));
  };

  function update() {
    const limit =
      rowsPerPage !== "undefined"
        ? rowsPerPage
        : String(process.env.NEXT_PUBLIC_PER_PAGE_INITIAL);

    fetch(
      `${Routes.ROOT}${Routes.SWEEPSTAKES}?page=${currentPage}&limit=${
        rowsPerPage !== "all" ? limit : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPages(Math.ceil(total / +(limit === "all" ? total : limit)));
        if (
          currentPage > Math.ceil(total / +(limit === "all" ? total : limit))
        ) {
          setCurrentPage(Math.ceil(total / +(limit === "all" ? total : limit)));
        }
        const filteredItems = data.filter(
          (row: ISweepstake) => row.status === activeFilter
        );
        activeFilter === "all"
          ? setFilteredTableRows(data)
          : setFilteredTableRows(filteredItems);
      });
  }

  useEffect(() => {
    if (rowId) {
      const newRowData = {
        ...filteredTableRows[+rowId],
        status: "completed",
        statuses: ["completed"],
      };

      fetch(`${Routes.ROOT}${Routes.SWEEPSTAKES}/${rowId}`, {
        method: "PUT",
        body: JSON.stringify(newRowData),
        headers: { "content-type": "application/json" },
      }).then(() => {
        dispatch(toggleModal(false));
        update();
      });
    }
  }, [rowId]);

  useEffect(() => {
    update();
  }, [rowsPerPage, currentPage, activeFilter]);

  if (!filteredTableRows) {
    return <h3>Loading...</h3>;
  }

  // table rows
  const rows = filteredTableRows.map((row) => {
    const {
      id,
      title,
      focus,
      raised,
      entries,
      status,
      statuses,
      link,
      start_date,
      end_date,
    } = row;

    return (
      <tr key={id}>
        <td>{title}</td>
        <td>{focus}</td>
        <td>
          {currencyFormatter(raised, "en", {
            style: "currency",
            currency: "usd",
            maximumFractionDigits: 0,
          })}
        </td>
        <td>{entries}</td>
        <td>
          {statuses.map((status) => (
            <Chip key={status} status={status}>
              {status}
            </Chip>
          ))}
        </td>
        <td>
          {status === "active" && (
            <MainButton
              type="button"
              onClick={() => modalHandler("publish", link)}
              data-promote
            >
              Promote{" "}
              <Image
                src="/icons/promote.svg"
                width={11.72}
                height={6.66}
                alt="icon"
                style={{ marginLeft: "1rem" }}
              />
            </MainButton>
          )}
          {status === "inactive" && (
            <>
              <MainButton
                type="button"
                onClick={() => modalHandler("accept", link, id)}
                data-accept
              >
                Accept{" "}
                <Image
                  src="/icons/accept.svg"
                  width={11.17}
                  height={8.38}
                  alt="icon"
                  style={{ marginLeft: "1rem" }}
                />
              </MainButton>
              <MainButton type="button" onClick={() => {}} data-decline>
                Decline{" "}
                <Image
                  src="/icons/decline.svg"
                  width={8.79}
                  height={8.79}
                  alt="icon"
                  style={{ marginLeft: "1rem" }}
                />
              </MainButton>
            </>
          )}
        </td>
        <td>{dateTimeFromStampFormatter(+start_date)}</td>
        <td>{dateTimeFromStampFormatter(+end_date)}</td>
      </tr>
    );
  });

  return (
    <>
      <div className={styles.table__actions}>
        {filters && (
          <div className={styles.table__filters}>
            Filters: <ul>{tableFilters}</ul> {completed} completed
          </div>
        )}

        {pagination && (
          <div className={styles.table__pagination}>
            <span>
              Showing {filteredTableRows.length} of {total}
            </span>
            <span>Rows per page</span>
            <select
              ref={rowsPerpageRef}
              value={rowsPerPage}
              onChange={handleRowsPerPage}
            >
              {pages}
            </select>
            <span className={styles.table__pages_switcher}>
              <i
                onClick={() => handleSwitchPage("backward")}
                className={currentPage < 2 ? styles.disabled : ""}
              >
                &#10094;
              </i>
              {currentPage}
              <i
                onClick={() => handleSwitchPage("forward")}
                className={currentPage >= totalPages ? styles.disabled : ""}
              >
                &#10095;
              </i>
            </span>
          </div>
        )}
      </div>

      <div className={styles.table__wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Focus</th>
              <th>Raised</th>
              <th>Entries</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Start date, time</th>
              <th>End date, time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      {showModal && createPortal(<Modal>{modalContent}</Modal>, document.body)}
    </>
  );
};
