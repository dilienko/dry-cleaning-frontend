export enum Branch {
  obolon = 'obolon',
  pozniaky = 'pozniaky',
  lybidska = 'lybidska',
}

export const BRANCHES = [
  { title: 'Оболонь', value: Branch.obolon },
  { title: 'Позняки', value: Branch.pozniaky },
  { title: 'Либідська', value: Branch.lybidska },
];

export enum StatusEnum {
  RECEIVED = 'Received',
  INPROGRESS = 'In progress',
  DONE = 'Done',
  RETURNED = 'Returned',
}

export type status = 'Done' | 'In progress' | 'Received' | 'Returned';
