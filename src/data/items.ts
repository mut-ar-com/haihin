export interface Item {
  id: string;
  name: string;
  price: number;
  category: 'furniture' | 'appliances';
}

export interface Option {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const items: Item[] = [
  // 家具
  { id: 'furniture-1', name: 'シングルベッド', price: 4400, category: 'furniture' },
  { id: 'furniture-2', name: 'テレビ台', price: 2200, category: 'furniture' },
  { id: 'furniture-3', name: 'ソファー', price: 3300, category: 'furniture' },
  { id: 'furniture-4', name: 'タンス', price: 5500, category: 'furniture' },
  { id: 'furniture-5', name: '本棚', price: 2200, category: 'furniture' },
  { id: 'furniture-6', name: '机', price: 2200, category: 'furniture' },
  { id: 'furniture-7', name: '椅子', price: 1100, category: 'furniture' },
  { id: 'furniture-8', name: 'カーペット', price: 2200, category: 'furniture' },

  // 家電
  { id: 'appliances-1', name: '冷蔵庫（301〜500L）', price: 8800, category: 'appliances' },
  { id: 'appliances-2', name: '洗濯機ドラム式', price: 6600, category: 'appliances' },
  { id: 'appliances-3', name: 'テレビ（32型以下）', price: 3300, category: 'appliances' },
  { id: 'appliances-4', name: 'エアコン（壁掛け）', price: 5500, category: 'appliances' },
  { id: 'appliances-5', name: '電子レンジ', price: 2200, category: 'appliances' },
  { id: 'appliances-6', name: '炊飯器', price: 1100, category: 'appliances' },
  { id: 'appliances-7', name: '掃除機', price: 1100, category: 'appliances' },
  { id: 'appliances-8', name: '扇風機', price: 1100, category: 'appliances' },
];

export const options: Option[] = [
  {
    id: 'option-1',
    name: 'データ消去証明書',
    price: 1100,
    description: 'PDF形式、HDD破壊可能',
  },
  {
    id: 'option-2',
    name: '写真報告',
    price: 1100,
    description: '法人様・不在時対応',
  },
  {
    id: 'option-3',
    name: '吊り作業（二階）',
    price: 12100,
    description: '事前写真必要、2名以上',
  },
]; 