export interface Material {
  id: string;
  name: string;
  category: string;
}

export interface Spec {
  id: string;
  name: string;
  type: 'shape' | 'size';
}

export interface Accessory {
  id: string;
  name: string;
  category: string;
}

export interface MallData {
  materials: Material[];
  specs: Spec[];
  accessories: Accessory[];
}
