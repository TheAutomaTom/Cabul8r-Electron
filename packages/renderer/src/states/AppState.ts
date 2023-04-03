// import { ModalSpecification, ModalType } from "./../models/modals";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Takeoff/Takeoff";

export const useAppState = defineStore("AppState", () => {

  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  const Project = ref({
    projectName: "No project loaded", projectClient: "No project loaded"
  } as Project);

  return {
    IsLoading,
    IsScrolled,
    Project
  };
});
