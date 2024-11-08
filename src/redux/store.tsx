import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import assessmentReducer from "./slices/individualassessment.slice";
import assessmentResponseReducer from "./slices/individualAssessmentResponse.slice";
import coursesReducer from "./slices/courses.slice";
import videoProgressReducer from "./slices/courses.slice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PerformanceManagementReducer from "./slices/performanceManagement.slice";
import trainingOnDemandReducer from "./slices/traningdemand.slice";


const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  assessment: assessmentReducer,
  courses: coursesReducer,
  videoProgress: videoProgressReducer,
  performance: PerformanceManagementReducer,
  assessmentResponse: assessmentResponseReducer,
  trainingOnDemand: trainingOnDemandReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
