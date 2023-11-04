import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "App";

export type StackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;