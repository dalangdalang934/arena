import { useState } from 'react';
import type { DecisionRecord, Position } from '../types';
import { t, type Language } from '../i18n/translations';

export default function RightTabs({
  positions,
  decisions,
  language,
}: {
  positions?: Position[];
  decisions?: DecisionRecord[];
  language: Language;
}) {
  const [tab, setTab] = useState<'positions' | 'trades' | 'readme'>('positions');
  return (
    <div className="binance-card p-6 h-fit lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)]">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: '#2B3139' }}>
        <TabButton active={tab === 'positions'} onClick={() => setTab('positions')}>持仓</TabButton>
        <TabButton active={tab === 'trades'} onClick={() => setTab('trades')}>决策</TabButton>
        <TabButton active={tab === 'readme'} onClick={() => setTab('readme')}>说明</TabButton>
      </div>
      {tab === 'positions' && <PositionsPanel positions={positions} language={language} />}
      {tab === 'trades' && <TradesPanel decisions={decisions} language={language} />}
      {tab === 'readme' && <div className="text-sm" style={{ color: '#848E9C' }}>加载数据…</div>}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: any }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded text-sm font-semibold"
      style={active ? { background: '#F0B90B', color: '#000' } : { color: '#848E9C', border: '1px solid #2B3139' }}
    >
      {children}
    </button>
  );
}

function PositionsPanel({ positions, language }: { positions?: Position[]; language: Language }) {
  return positions && positions.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left border-b border-gray-800">
          <tr>
            <th className="pb-3 font-semibold text-gray-400">{t('symbol', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('side', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('entryPrice', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('markPrice', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('quantity', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('positionValue', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('leverage', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('unrealizedPnL', language)}</th>
            <th className="pb-3 font-semibold text-gray-400">{t('liqPrice', language)}</th>
          </tr>
        </thead>
        <tbody>
          {positions!.map((pos, i) => (
            <tr key={i} className="border-b border-gray-800 last:border-0">
              <td className="py-3 font-mono font-semibold">{pos.symbol}</td>
              <td className="py-3">
                <span
                  className="px-2 py-1 rounded text-xs font-bold"
                  style={pos.side === 'long'
                    ? { background: 'rgba(14, 203, 129, 0.1)', color: '#0ECB81' }
                    : { background: 'rgba(246, 70, 93, 0.1)', color: '#F6465D' }
                  }
                >
                  {t(pos.side === 'long' ? 'long' : 'short', language)}
                </span>
              </td>
              <td className="py-3 font-mono" style={{ color: '#EAECEF' }}>{pos.entry_price.toFixed(4)}</td>
              <td className="py-3 font-mono" style={{ color: '#EAECEF' }}>{pos.mark_price.toFixed(4)}</td>
              <td className="py-3 font-mono" style={{ color: '#EAECEF' }}>{pos.quantity.toFixed(4)}</td>
              <td className="py-3 font-mono font-bold" style={{ color: '#EAECEF' }}>
                {(pos.quantity * pos.mark_price).toFixed(2)} USDT
              </td>
              <td className="py-3 font-mono" style={{ color: '#F0B90B' }}>{pos.leverage}x</td>
              <td className="py-3 font-mono">
                <span style={{ color: pos.unrealized_pnl >= 0 ? '#0ECB81' : '#F6465D', fontWeight: 'bold' }}>
                  {pos.unrealized_pnl >= 0 ? '+' : ''}
                  {pos.unrealized_pnl.toFixed(2)} ({pos.unrealized_pnl_pct.toFixed(2)}%)
                </span>
              </td>
              <td className="py-3 font-mono" style={{ color: '#848E9C' }}>
                {pos.liquidation_price.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center py-16" style={{ color: '#848E9C' }}>暂无持仓</div>
  );
}

function TradesPanel({ decisions, language }: { decisions?: DecisionRecord[]; language: Language }) {
  return decisions && decisions.length > 0 ? (
    <div className="space-y-3 pr-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
      {decisions!.map((d, i) => (
        <div key={i} className="rounded p-4" style={{ border: '1px solid #2B3139', background: '#1E2329' }}>
          <div className="flex items-center justify-between">
            <div className="font-semibold" style={{ color: '#EAECEF' }}>周期 #{d.cycle_number}</div>
            <div className="text-xs" style={{ color: '#848E9C' }}>{new Date(d.timestamp).toLocaleString()}</div>
          </div>
          {d.decisions && d.decisions.length > 0 && (
            <div className="mt-2 text-xs" style={{ color: '#EAECEF' }}>
              {d.decisions.map((a, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className="font-mono">{a.symbol}</span>
                  <span>{a.action}</span>
                  {a.leverage > 0 && <span style={{ color: '#F0B90B' }}>{a.leverage}x</span>}
                  {a.price > 0 && <span className="font-mono" style={{ color: '#848E9C' }}>@{a.price.toFixed(4)}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-16" style={{ color: '#848E9C' }}>暂无决策</div>
  );
}


