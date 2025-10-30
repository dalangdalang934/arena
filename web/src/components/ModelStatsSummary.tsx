import type { AccountInfo } from '../types';

export default function ModelStatsSummary({ account }: { account?: AccountInfo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Stat title="账户总资产" value={`${account?.total_equity?.toFixed(2) || '0.00'} USDT`} />
      <Stat
        title="可用余额"
        value={`${account?.available_balance?.toFixed(2) || '0.00'} USDT`}
        subtitle={`${(account?.available_balance && account?.total_equity ? ((account.available_balance / account.total_equity) * 100).toFixed(1) : '0.0')}% 可用`}
      />
      <Stat
        title="总盈亏"
        value={`${account?.total_pnl !== undefined && (account.total_pnl ?? 0) >= 0 ? '+' : ''}${account?.total_pnl?.toFixed(2) || '0.00'} USDT`}
        highlight={(account?.total_pnl ?? 0) >= 0 ? '#0ECB81' : '#F6465D'}
      />
      <Stat title="持仓数" value={`${account?.position_count || 0}`} subtitle={`保证金占用: ${account?.margin_used_pct?.toFixed(1) || '0.0'}%`} />
    </div>
  );
}

function Stat({ title, value, subtitle, highlight }: { title: string; value: string; subtitle?: string; highlight?: string }) {
  return (
    <div className="stat-card animate-fade-in">
      <div className="text-xs mb-2 mono uppercase tracking-wider" style={{ color: '#848E9C' }}>{title}</div>
      <div className="text-2xl font-bold mb-1 mono" style={{ color: highlight || '#EAECEF' }}>{value}</div>
      {subtitle && <div className="text-xs mt-2 mono" style={{ color: '#848E9C' }}>{subtitle}</div>}
    </div>
  );
}


