export type NavigationLabel = {
  label: string;
};

export type NavigationItem = {
  title: string;
  url: string;
  icon?: any;
};

export type NavigationChildren = {
  title: string;
  icon?: any;
  defaultOpen?: boolean;
  items: NavigationItem[];
};

export type NavigationConfig = NavigationLabel | NavigationItem | NavigationChildren;
