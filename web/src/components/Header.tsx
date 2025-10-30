import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

type Props = {
  currentPage: 'home' | 'leaderboard' | 'models';
  onChangePage: (p: 'home' | 'leaderboard' | 'models') => void;
};

export default function Header({ currentPage, onChangePage }: Props) {
  const { language, setLanguage } = useLanguage();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{ background: 'var(--background-elevated)', borderColor: 'var(--panel-border)' }}
    >
      <div className="relative flex h-14 w-full items-center px-4 text-xs" style={{ color: 'var(--foreground)' }}>
        {/* 左：品牌 */}
        <div className="flex min-w-0 flex-1">
          <a
            href="/"
            className="font-semibold tracking-wide"
            style={{ color: 'var(--binance-yellow)' }}
          >
            nofx
          </a>
        </div>

        {/* 中：主导航（绝对居中） */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4" aria-label="Primary">
          <button
            onClick={() => onChangePage('home')}
            className="px-3 py-1.5 rounded chip-btn"
            style={
              currentPage === 'home'
                ? { background: 'var(--binance-yellow)', color: '#000' }
                : { color: 'var(--text-secondary)', border: '1px solid var(--panel-border)' }
            }
          >
            实盘
          </button>
          <button
            onClick={() => onChangePage('leaderboard')}
            className="px-3 py-1.5 rounded chip-btn"
            style={
              currentPage === 'leaderboard'
                ? { background: 'var(--binance-yellow)', color: '#000' }
                : { color: 'var(--text-secondary)', border: '1px solid var(--panel-border)' }
            }
          >
            排行榜
          </button>
          <button
            onClick={() => onChangePage('models')}
            className="px-3 py-1.5 rounded chip-btn"
            style={
              currentPage === 'models'
                ? { background: 'var(--binance-yellow)', color: '#000' }
                : { color: 'var(--text-secondary)', border: '1px solid var(--panel-border)' }
            }
          >
            模型
          </button>
        </nav>

        {/* 右：外链 + 语言切换 */}
        <div className="flex min-w-0 flex-1 justify-end items-center gap-2">
          <div
            className="flex overflow-hidden rounded border"
            style={{ borderColor: 'var(--panel-border)' }}
          >
            {[
              { key: 'zh', label: '中文' },
              { key: 'en', label: 'EN' },
            ].map((opt) => (
              <button
                key={opt.key}
                className="px-2 py-1 text-[11px]"
                style={
                  language === (opt.key as any)
                    ? { background: 'var(--binance-yellow)', color: '#000' }
                    : { color: 'var(--text-secondary)' }
                }
                onClick={() => setLanguage(opt.key as any)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}


