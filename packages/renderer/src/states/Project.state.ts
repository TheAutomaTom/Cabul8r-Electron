import { ref } from "vue";
import { defineStore } from "pinia";
import { Molecule } from "../../../ipc-models/Molecule";
import type { Project } from "../../../ipc-models/Project";

export const useProjectState = defineStore("ProjectState", () => {

  //= Private Methods ==>

  const createMolecule = (input= new Molecule("...") ): Molecule => {
    const molecule = JSON.parse(JSON.stringify(input)) as Molecule;
    molecule.uuid= crypto.randomUUID();

    if( molecule.molecules != null ){
      molecule.molecules.forEach((m) => {
        m.uuid = crypto.randomUUID();
        if(m.molecules){
          createMolecule(m);
        }
      });
    }
    return molecule;
  };

  const reassignIds = ( molecules: Molecule[] = Project.value.molecules ) => {
    Project.value.uuid = crypto.randomUUID();
    for(const m of molecules){
      m.uuid = crypto.randomUUID();
      if(m.molecules){
        reassignIds(m.molecules);
      }
    }
  };

  //= Properties ==>
  const HighlightedRow = ref({} as Molecule);
  const Project = ref({
    uuid: "x",
    name: "No project loaded...",
    client: "No client loaded...",
    molecules: [] as Molecule[]
  } as Project);
  const focussedRow = ref({} as Molecule);
  const clipboardRow = ref({} as Molecule);
  const isCutMode = ref(false);


  //= Public Methods ==>
  const LoadProjectFile = (project: Project) => {
    reassignIds(project.molecules);
    Object.assign(Project.value, project);
  };

  const SetRightClickFocus = (element: Molecule) => {
    focussedRow.value = element;
  };

  const OnAddRowSibling = ( molecules: Molecule[] = Project.value.molecules ) => {
    for(const molecule of molecules){
      if(molecule.uuid == focussedRow.value.uuid){
        const newRow = createMolecule();
        molecules.push(newRow);
        break;
      } else if (molecule.molecules != null){
        OnAddRowSibling(molecule.molecules);
      }
    }
  };

  const OnAddRowChild = ( molecules: Molecule[] = Project.value.molecules ) => {
    for(const molecule of molecules){
      if(molecule.uuid == focussedRow.value.uuid){
        if(molecule.molecules == null){
          molecule.molecules = [];
        }
        const newRow = createMolecule();
        molecule.molecules.push(newRow);
        break;
      } else if (molecule.molecules != null){
        OnAddRowChild(molecule.molecules);
      }
    }
  };

  const OnCopyRow = () => { clipboardRow.value = focussedRow.value; isCutMode.value = false; };
  const OnSelectCutRow = ()  => { clipboardRow.value = focussedRow.value; isCutMode.value = true; };

  const OnDeleteRow = ( molecules: Molecule[] = Project.value.molecules  ) => {
    for(const molecule of molecules){
      if(molecule.uuid == focussedRow.value.uuid){
        const index = molecules.indexOf(focussedRow.value);
        if (index > -1) { // only splice array when item is found
          molecules.splice(index, 1); // 2nd parameter means remove one item only
        }
        break;
      } else if (molecule.molecules != null){
        OnDeleteRow(molecule.molecules);
      }
    }
  };

  const OnDeleteCutRow = ( molecules: Molecule[] = Project.value.molecules  ) => {
    for(const molecule of molecules){

      if(molecule.uuid == clipboardRow.value.uuid){
        const index = molecules.indexOf(clipboardRow.value);
        if (index > -1) { // only splice array when item is found
          molecules.splice(index, 1); // 2nd parameter means remove one item only
        }
        break;
      } else if (molecule.molecules != null){
        OnDeleteCutRow(molecule.molecules);
      }
    }
  };

  const OnPasteRowSibling = ( molecules: Molecule[] = Project.value.molecules ) => {
    for(const molecule of molecules){
      if(molecule.uuid == focussedRow.value.uuid){
        const newRow = createMolecule(clipboardRow.value);
        molecules.push(newRow);
        if(isCutMode.value == true) OnDeleteCutRow();
        break;
      } else if (molecule.molecules != null){
        OnPasteRowSibling(molecule.molecules);
      }
    }
  };

  const OnPasteRowChild = ( molecules: Molecule[] = Project.value.molecules ) => {
    for(const molecule of molecules){
      if(molecule.uuid == focussedRow.value.uuid){
        if(molecule.atoms == null){
          molecule.atoms = [];
        }
        const newRow = createMolecule(clipboardRow.value);
        if(molecule.molecules == undefined) molecule.molecules = [];
        molecule.molecules.push(newRow);
        if(isCutMode.value == true)OnDeleteCutRow();
        break;
      } else if (molecule.molecules != null){
        OnPasteRowChild(molecule.molecules);
      }
    }
  };







  return {
    Project,
    HighlightedRow,
    LoadProjectFile,
    SetRightClickFocus,
    OnCopyRow,
    OnCutRow: OnSelectCutRow,
    OnDeleteRow,
    OnPasteRowSibling,
    OnPasteRowChild,
    OnAddRowSibling,
    OnAddRowChild

  };
});
