export interface MenuItems {
  icon: string;
  name: string;
  route: string;
}

export interface IEvent {
  id: string;
  title: string;
  startAt: Date;
  endAt: Date;
  description: string;
  state: string;
}

export interface IItem {
  id: string;
  title: string;
  description: string;
  score: number;
}

export interface IList {
  id: string;
  title: string;
  description: string;
  category: string;
  items?: IItem[];
  itemsCount?: number;
}
