export interface Registry {
  name: string;
  icon: string;
  url: string;
}

export const registry = [
  {
    name: 'User registry',
    icon: 'bi-circle',
    url: 'user'
  },
  {
    name: 'Product registry',
    icon: 'bi-circle',
    url: 'product'
  },
  {
    name: 'Category registry',
    icon: 'bi-circle',
    url: 'category'
  }
];
