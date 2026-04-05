import React, { useState } from 'react';
import { motion } from 'motion/react';
import { mallData } from '../constants/mallData';

const CategoryGrid = () => {
  const categories = ['竹木类', '宝玉石类', '菩提与籽核类', '其他材质'];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {categories.map((cat) => (
        <motion.div 
          key={cat}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-sm shadow-lg border border-wenwan-gold/20 text-center cursor-pointer hover:border-wenwan-gold transition-all"
        >
          <h3 className="text-xl font-serif font-bold text-wenwan-ink">{cat}</h3>
        </motion.div>
      ))}
    </div>
  );
};

const ProductCustomizer = () => {
  const [material, setMaterial] = useState('');
  const [spec, setSpec] = useState('');
  const [accessory, setAccessory] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-12 rounded-sm shadow-2xl">
      {/* 3D Model Placeholder */}
      <div className="bg-[#F9F6F0] rounded-sm flex items-center justify-center h-[500px] border-2 border-dashed border-wenwan-gold/30">
        <p className="text-wenwan-gold/50 font-serif tracking-widest">预留3D模型展示区域</p>
      </div>

      {/* Customization Panel */}
      <div className="space-y-8">
        <h2 className="text-3xl font-serif font-bold text-wenwan-ink border-b border-wenwan-gold/20 pb-4">专属定制</h2>
        
        {/* Material */}
        <div>
          <label className="block text-sm font-bold text-wenwan-ink mb-3 tracking-widest">材质选择</label>
          <select 
            value={material} 
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold bg-transparent"
          >
            <option value="">请选择材质</option>
            {mallData.materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        {/* Spec */}
        <div>
          <label className="block text-sm font-bold text-wenwan-ink mb-3 tracking-widest">规格大小</label>
          <select 
            value={spec} 
            onChange={(e) => setSpec(e.target.value)}
            className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold bg-transparent"
          >
            <option value="">请选择规格</option>
            {mallData.specs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        {/* Accessory */}
        <div>
          <label className="block text-sm font-bold text-wenwan-ink mb-3 tracking-widest">配饰样式</label>
          <select 
            value={accessory} 
            onChange={(e) => setAccessory(e.target.value)}
            className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-wenwan-gold bg-transparent"
          >
            <option value="">请选择配饰</option>
            {mallData.accessories.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <button className="w-full bg-wenwan-ink text-white py-4 rounded-sm font-bold tracking-[0.3em] hover:bg-wenwan-gold transition-all">
          立即定制
        </button>
      </div>
    </div>
  );
};

export default function MallPage() {
  return (
    <div className="min-h-screen bg-wenwan-paper py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-wenwan-ink mb-16 text-center">雅集商城</h1>
        <CategoryGrid />
        <ProductCustomizer />
      </div>
    </div>
  );
}
