import type { TraderInfo, SystemStatus } from '../types';

export default function ModelSelectorBar({
  traders,
  selectedTraderId,
  onChange,
  status,
}: {
  traders?: TraderInfo[];
  selectedTraderId?: string;
  onChange: (id: string) => void;
  status?: SystemStatus;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {traders && traders.length > 0 && (
        <select
          value={selectedTraderId}
          onChange={(e) => onChange(e.target.value)}
          className="rounded px-3 py-2 text-sm font-medium cursor-pointer transition-colors"
          style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
        >
          {traders.map((trader) => (
            <option key={trader.trader_id} value={trader.trader_id}>
              {trader.trader_name} ({trader.ai_model.toUpperCase()})
            </option>
          ))}
        </select>
      )}
      {status && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded"
          style={status.is_running
            ? { background: 'rgba(14, 203, 129, 0.1)', color: '#0ECB81', border: '1px solid rgba(14, 203, 129, 0.2)' }
            : { background: 'rgba(246, 70, 93, 0.1)', color: '#F6465D', border: '1px solid rgba(246, 70, 93, 0.2)' }
          }
        >
          <div
            className={`w-2 h-2 rounded-full ${status.is_running ? 'pulse-glow' : ''}`}
            style={{ background: status.is_running ? '#0ECB81' : '#F6465D' }}
          />
          <span className="font-semibold mono text-xs">
            {status.is_running ? '运行中' : '已停止'}
          </span>
        </div>
      )}
    </div>
  );
}


