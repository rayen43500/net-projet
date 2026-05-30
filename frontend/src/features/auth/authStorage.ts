type AuthSnapshot = {
  token: string | null;
  role: string | null;
  userId: string | null;
};

const AUTH_KEY = "dsp.auth";

export const authStorage = {
  load(): AuthSnapshot {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) {
        return { token: null, role: null, userId: null };
      }
      const parsed = JSON.parse(raw) as AuthSnapshot;
      return {
        token: parsed.token ?? null,
        role: parsed.role ?? null,
        userId: parsed.userId ?? null
      };
    } catch {
      return { token: null, role: null, userId: null };
    }
  },
  save(snapshot: AuthSnapshot) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(snapshot));
  },
  clear() {
    localStorage.removeItem(AUTH_KEY);
  }
};
