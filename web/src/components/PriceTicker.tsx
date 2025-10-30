import { useEffect, useMemo, useRef, useState } from 'react';

export default function PriceTicker() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [loop, setLoop] = useState(false);

  // 暂无价格数据源：占位列表为空即不渲染
  const list: { symbol: string; price: number }[] = useMemo(() => [], []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const check = () => {
      const need = track.scrollWidth > wrap.clientWidth + 8;
      setLoop(need);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(wrap);
    ro.observe(track);
    return () => ro.disconnect();
  }, [list]);

  if (!list.length) return null;

  return (
    <div
      className="w-full border-b h-8"
      style={{ borderColor: 'var(--panel-border)', background: 'var(--panel-bg)' }}
    >
      <div ref={wrapRef} className="h-full overflow-hidden px-3">
        {loop ? (
          <div className="relative h-full">
            <div
              ref={trackRef}
              className="ticker-track absolute left-0 top-0 flex h-full items-center gap-6 whitespace-nowrap text-xs leading-relaxed"
              style={{ color: 'var(--foreground)' }}
            >
              {renderItems(list)}
              {renderItems(list)}
            </div>
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex h-full items-center gap-6 whitespace-nowrap text-xs leading-relaxed"
            style={{ color: 'var(--foreground)', overflowX: 'auto' as any }}
          >
            {renderItems(list)}
          </div>
        )}
      </div>
    </div>
  );
}

function renderItems(list: { symbol: string; price: number }[]) {
  return list.map((p) => (
    <span key={`${p.symbol}-${Math.random()}`} className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>
      <b className="mr-1" style={{ color: 'var(--foreground)' }}>
        {p.symbol}
      </b>
      {p.price.toFixed(2)}
    </span>
  ));
}


