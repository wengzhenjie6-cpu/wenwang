import { MallData } from '../types/mall';

export const mallData: MallData = {
  materials: [
    { id: 'm1', name: '小叶紫檀', category: '竹木类' },
    { id: 'm2', name: '黄花梨', category: '竹木类' },
    { id: 'm3', name: '和田玉', category: '宝玉石类' },
    { id: 'm4', name: '翡翠', category: '宝玉石类' },
    { id: 'm5', name: '星月菩提', category: '菩提与籽核类' },
    { id: 'm6', name: '金刚菩提', category: '菩提与籽核类' },
  ],
  specs: [
    { id: 's1', name: '圆珠', type: 'shape' },
    { id: 's2', name: '桶珠', type: 'shape' },
    { id: 's3', name: '15mm', type: 'size' },
    { id: 's4', name: '18mm', type: 'size' },
  ],
  accessories: [
    { id: 'a1', name: '佛头', category: '主件配饰' },
    { id: 'a2', name: '顶珠', category: '主件配饰' },
    { id: 'a3', name: '隔片', category: '功能性小配件' },
  ]
};
