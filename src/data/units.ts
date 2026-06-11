import type { Unit } from '../types';

export const STEP_LABELS: Record<string, { name: string; desc: string }[]> = {
  sakuranbo: [
    { name: '10の ごうせい',              desc: '10に なる くみあわせを おぼえよう' },
    { name: 'さくらんぼ算（かんたん）',    desc: 'かたほうが わかれば できるかな？' },
    { name: 'さくらんぼ算（ぜんぶ）',      desc: 'あなを ぜんぶ うめよう' },
    { name: 'さくらんぼ算（ヒントあり）',  desc: 'じぶんで かんがえて みよう' },
    { name: 'しあげ ドリル',               desc: 'こたえだけ こたえよう！' },
  ],
};

export const UNITS_BY_SUBJECT: Record<string, Unit[]> = {
  math: [
    {
      key: 'sakuranbo',
      name: 'さくらんぼ算',
      furi: 'さくらんぼざん',
      color: '#FF6F91',
      soft: '#FFE6ED',
      stepCount: 5,
    },
  ],
};
