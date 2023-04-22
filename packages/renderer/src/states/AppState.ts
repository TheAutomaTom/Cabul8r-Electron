// import { ModalSpecification, ModalType } from "./../models/modals";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Takeoff/Project";

export const useAppState = defineStore("AppState", () => {

  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  const LoadProjectFile = (project: Project) => Project.value = project;

  const Project = ref({
    projectName: "No project loaded", projectClient: "No project loaded"
  } as Project);

  return {
    IsLoading,
    IsScrolled,
    Project,
    LoadProjectFile
  };
});
