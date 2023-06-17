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
- Project
  - id: string;
  - name: string;
  - client: string;
  - lineItems: LineItem[];
      - id: string;
      - name: string;
      - quantity: number;
      - lineItems?: LineItem[];
      - cost: LineItemCost;
         - id: string;
         - name: string;
         - material: Cost[];
             -  id: number;
             -  uuid: string;
             -  kind: string;
             -  uom: UnitOfMeasurement;
             -  name: string;
             -  amount: number;
         - labor: Cost[];
             -  ...
             