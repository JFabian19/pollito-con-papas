export interface MenuItem {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface MenuCategory {
  categoria: string;
  descripcion?: string;
  items: MenuItem[];
}

export interface RestaurantData {
  restaurante: string;
  menu: MenuCategory[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}
