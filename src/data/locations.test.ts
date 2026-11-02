import { describe, it, expect, vi, afterEach } from 'vitest';
import { isStoreOpen, getStoreStatus } from './locations';
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

describe('getStoreStatus', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('labels open store with its closing time', () => {
    vi.setSystemTime(new Date('2026-03-31T12:00:00')); // Tue noon
    expect(getStoreStatus(mainStore)).toEqual({
      isOpen: true,
      label: 'Open Now · Closes 6:00 PM',
    });
  });

  it('labels before-opening store with today opening time', () => {
    vi.setSystemTime(new Date('2026-03-31T05:00:00')); // Tue 05:00
    expect(getStoreStatus(mainStore)).toEqual({
      isOpen: false,
      label: 'Closed · Opens 6:00 AM',
    });
  });

  it('labels after-closing store with tomorrow opening time', () => {
    vi.setSystemTime(new Date('2026-03-31T19:00:00')); // Tue 19:00
    expect(getStoreStatus(mainStore)).toEqual({
      isOpen: false,
      label: 'Closed · Opens 6:00 AM tomorrow',
    });
  });

  it('uses each store own hours', () => {
    vi.setSystemTime(new Date('2026-03-31T15:00:00')); // Tue 3:00 PM
    const shellStore = makeLocation({
      mon: ['07:00', '16:00'], tue: ['07:00', '16:00'], wed: ['07:00', '16:00'],
      thu: ['07:00', '16:00'], fri: ['07:00', '16:00'], sat: ['07:00', '16:00'],
      sun: ['07:00', '16:00'],
    });
    expect(getStoreStatus(shellStore)).toEqual({
      isOpen: true,
      label: 'Open Now · Closes 4:00 PM',
    });
  });

  it('agrees with isStoreOpen', () => {
    vi.setSystemTime(new Date('2026-03-31T18:01:00')); // Tue 18:01
    expect(getStoreStatus(mainStore).isOpen).toBe(isStoreOpen(mainStore));
  });
});
