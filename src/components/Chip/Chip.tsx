import { ReactNode } from "react";
import styles from "./Chip.module.scss";

enum ChipStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SCHEDULED = "scheduled",
  WINNER_NOTIFIED = "winner_notified",
  COMPLETED = "completed",
  DRAFT = "draft",
}

interface IChipProps {
  children: ReactNode;
  status?: string;
}

export const Chip = ({ children, status }: IChipProps): JSX.Element => {
  let statusClass = styles.default;

  switch (status) {
    case ChipStatus.ACTIVE:
      statusClass = styles.active;
      break;
    case ChipStatus.INACTIVE:
      statusClass = styles.inactive;
      break;
    case ChipStatus.SCHEDULED:
      statusClass = styles.scheduled;
      break;
    case ChipStatus.WINNER_NOTIFIED:
      statusClass = styles.winner_notified;
      break;
    case ChipStatus.COMPLETED:
      statusClass = styles.completed;
      break;
    case ChipStatus.DRAFT:
      statusClass = styles.draft;
      break;
    default:
      statusClass = styles.default;
  }

  return (
    <span className={`${styles.chip} ${statusClass}`}>
      {children?.toString().split("_").join(" ")}
    </span>
  );
};
