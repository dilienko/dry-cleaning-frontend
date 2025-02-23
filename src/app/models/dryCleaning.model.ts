export enum Branch {
  obolon = 'obolon',
  pozniaky = 'pozniaky',
  lybidska = 'lybidska',
  all = '',
}

export type options = { title: string; value: string }[];

export const BRANCHES: options = [
  { title: 'Оболонь', value: Branch.obolon },
  { title: 'Позняки', value: Branch.pozniaky },
  { title: 'Либідська', value: Branch.lybidska },
  { title: 'Всі філії', value: Branch.all },
];

export enum StatusEnum {
  RECEIVED = 'Received',
  INPROGRESS = 'In progress',
  DONE = 'Done',
  RETURNED = 'Returned',
}

export const STATUSES: options = [
  { title: 'Отримано', value: StatusEnum.RECEIVED },
  { title: 'В роботі', value: StatusEnum.INPROGRESS },
  { title: 'Виконано', value: StatusEnum.DONE },
  { title: 'Повернено', value: StatusEnum.RETURNED },
];

export type status = 'Done' | 'In progress' | 'Received' | 'Returned';
