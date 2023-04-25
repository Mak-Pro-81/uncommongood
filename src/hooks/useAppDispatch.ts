import { useDispatch, TypedUseSelectorHook } from "react-redux";
import { StoreDispatch } from "@/store";

export const useAppDispatch = () => <StoreDispatch>useDispatch();
