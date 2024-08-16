import { router } from '@/main';
import { useGlobalStore } from '@/stores/global';

export default function (bus) {
  const { setGlobalState } = useGlobalStore();
  // micro事件队列监听
  const events = [
    {
      // 子路由change事件监听
      event: 'route-change',
      handler: (...rest) => {
        // TODO
        router.push({ path: rest[0] });
      }
    },
    {
      // store注入
      event: 'store-inject',
      handler: (subName, store) => {
        // TODO
        setGlobalState(subName, store);
      }
    }
  ];

  return events.map(e =>
    bus.$on(e.event, (...rest: any[]) => {
      e.handler(...rest);
    })
  );
}
