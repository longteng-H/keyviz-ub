import { useTranslation } from 'react-i18next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { invoke } from '@tauri-apps/api/core';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: 'en', label: 'EN' },
    { value: 'zh-CN', label: '中文' },
  ];

  return (
    <ToggleGroup
      type="single"
      value={i18n.language}
      onValueChange={(lang) => {
        if (lang) {
          i18n.changeLanguage(lang);
          // Sync language to Rust backend
          invoke('set_language', { language: lang });
        }
      }}
      size="sm"
      variant="outline"
    >
      {languages.map((lang) => (
        <ToggleGroupItem key={lang.value} value={lang.value}>
          {lang.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
