import { describe, it, expect, vi, afterEach } from 'vitest';
import { isStoreOpen } from './locations';
import type { Location } from './locations';

function makeLocation(hours: Location['hours']): Location {
  return {
    id: 'test',
    name: 'Test Store',
    displayName: 'TEST STORE',
    storeId: 'test-store',
    address: ['Test Address'],
    coords: { lat: 0, lng: 0 },
    mapLink: '',
    image: '',
    icon: 'Store',
    color: '',
    hours,
    hasInventoryAPI: true,
  };
}

const allDay = ['06:00', '18:00'] as const;
const mainStore = makeLocation({
  mon: [...allDay], tue: [...allDay], wed: [...allDay],
  thu: [...allDay], fri: [...allDay], sat: [...allDay], sun: [...allDay],
});

describe('isStoreOpen', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true during store hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T12:00:00')); // Tue noon
    expect(isStoreOpen(mainStore)).toBe(true);
  });

  it('returns false before opening time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T05:00:00')); // Tue 05:00
    expect(isStoreOpen(mainStore)).toBe(false);
  });

  it('returns false after closing time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T19:00:00')); // Tue 19:00
    expect(isStoreOpen(mainStore)).toBe(false);
  });

  it('returns true at exact opening time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T06:00:00')); // Tue 06:00
    expect(isStoreOpen(mainStore)).toBe(true);
  });

  it('returns true at exact closing time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T18:00:00')); // Tue 18:00
    expect(isStoreOpen(mainStore)).toBe(true);
  });

  it('returns false one minute after closing time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T18:01:00')); // Tue 18:01
    expect(isStoreOpen(mainStore)).toBe(false);
  });

  it('respects different store hours', () => {
    const shellHours = ['07:00', '16:00'] as const;
    const shellStore = makeLocation({
      mon: [...shellHours], tue: [...shellHours], wed: [...shellHours],
      thu: [...shellHours], fri: [...shellHours], sat: [...shellHours], sun: [...shellHours],
    });
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T16:30:00')); // Tue 16:30
    expect(isStoreOpen(shellStore)).toBe(false);
  });

  it('correctly maps Sunday day-of-week', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-29T12:00:00')); // Sun noon
    expect(isStoreOpen(mainStore)).toBe(true);
  });
});
