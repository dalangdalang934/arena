import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

type Props = {
  currentPage: 'competition' | 'trader';
  onChangePage: (p: 'competition' | 'trader') => void;
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
            onClick={() => onChangePage('competition')}
            className="px-3 py-1.5 rounded chip-btn"
            style={
              currentPage === 'competition'
                ? { background: 'var(--binance-yellow)', color: '#000' }
                : { color: 'var(--text-secondary)', border: '1px solid var(--panel-border)' }
            }
          >
            {t('competition', language)}
          </button>
          <button
            onClick={() => onChangePage('trader')}
            className="px-3 py-1.5 rounded chip-btn"
            style={
              currentPage === 'trader'
                ? { background: 'var(--binance-yellow)', color: '#000' }
                : { color: 'var(--text-secondary)', border: '1px solid var(--panel-border)' }
            }
          >
            {t('details', language)}
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


