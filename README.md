This repo forked from this awesome, opinionated template:

https://github.com/cawa-93/vite-electron-builder

---

# <em>`CABUL8R+`</em> <small>the cabinet calculator</small>
>  A construction project estimate tool specialized for millwork and cabinetry.  This software is intended to replace sprawling, unmanageable spreadsheets that get created to cope with huge jobs with large varieties of materials.  It will offer reports for multiple applications, ranging from sales documents outlining scope, to detailed cost breakouts to assist in projecting profit and auditing performance.

#### This project has been created with:
  - [This highly opinionated template](https://github.com/cawa-93/vite-electron-builder).
- Typescript
- Vite
- Electron
- Electron Ipc standardization with  [`unplugin-auto-expose`](https://www.npmjs.com/package/unplugin-auto-expose)
- Vue 3
- Sqlite 3 with [`better-sqlite3`](https://www.npmjs.com/package/better-sqlite3)


#### Notes on models (w.i.p.)
- <strong>Project</strong>   
    <em>represents a package of items to be fabricated and installed.</em>
  - uuid: string;
  - name: string;
  - client: string;
  - molecules: <strong>Molecule[];</strong>   
    <em>a list of complex things to be built. Examples: `Host Station` or `Coffered Ceiling`</em>
    - uuid: string;
    - name: string;
    - quantity: number;
    - molecules: Molecule[]; 
    - atoms?: <strong>Atom[];</strong>   
    <em>A list simple things required to build a structure. Examples: `3" Wire Hardware` or `Faux Joist`</em>
      - uuid: string;
      - description: string;
      - quarks: <strong>Quark[];</strong>   
      <em>A list of items or tasks required for a part. Examples: `Model #1234` or `Pull Installation`</em>
        - uuid: string;
        - name: string;
        - category: string; // MAT, LAB
        - uom: UnitOfMeasurement; // EA, LF, SF
        - value: number; //cost per unit