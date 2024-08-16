import subscribe from '@/micro/subscribe';

// 主应用初始化
export function mainAppInitial({ bus }) {
  subscribe(bus);
}
