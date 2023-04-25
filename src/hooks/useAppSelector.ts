import { useSelector, TypedUseSelectorHook } from "react-redux";
import { StoreState } from "@/store";

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
