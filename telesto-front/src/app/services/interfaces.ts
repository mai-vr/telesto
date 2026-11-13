export interface MenuItems {
    icon: string;
    name: string;
    route: string
}

export interface IEvent {
    title: string;
    startAt: Date;
    endAt: Date;
    description: string;
    state: string;
}