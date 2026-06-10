// Small shared helpers used across controllers/models.

export const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

// Round to 2 decimal places to avoid floating point drift on money values.
export const round2 = (value) => Math.round((toNumber(value) + Number.EPSILON) * 100) / 100;

export const sanitizePagination = ({ page, limit } = {}) => {
  const safePage = Math.max(1, toNumber(page, 1));
  const safeLimit = Math.min(100, Math.max(1, toNumber(limit, 20)));
  return { page: safePage, limit: safeLimit, offset: (safePage - 1) * safeLimit };
};
