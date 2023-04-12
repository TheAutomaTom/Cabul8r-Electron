let recentSave = "";
export function SetSavePath( path: string ) { recentSave = path; }
export function GetSavePath(): string { return recentSave; }
export function ClearSavePath() { recentSave = ""; }
