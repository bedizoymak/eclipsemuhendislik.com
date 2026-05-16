import { useMemo, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BriefcaseBusiness,
  CheckSquare,
  ClipboardList,
  FileText,
  Headphones,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Receipt,
  Settings,
  ServerCog,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import logoDark from "@/assets/logo-dark-bg.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    title: "Genel",
    items: [{ to: "/admin", label: "Dashboard", description: "CRM özeti", icon: LayoutDashboard, end: true }],
  },
  {
    title: "CRM",
    items: [
      { to: "/admin/customers", label: "Müşteriler", description: "Cari ve ilişki takibi", icon: Users },
      { to: "/admin/leads", label: "Fırsatlar", description: "Satış pipeline", icon: TrendingUp },
      { to: "/admin/services", label: "Hizmetler", description: "BT hizmet kataloğu", icon: ServerCog },
    ],
  },
  {
    title: "Operasyon",
    items: [
      { to: "/admin/projects", label: "Projeler", description: "Teknik işler", icon: BriefcaseBusiness },
      { to: "/admin/tasks", label: "Görevler", description: "İş takibi", icon: CheckSquare },
      { to: "/admin/tickets", label: "Destek Talepleri", description: "Servis istekleri", icon: Headphones },
    ],
  },
  {
    title: "Finans",
    items: [
      { to: "/admin/offers", label: "Teklifler", description: "Proposal yönetimi", icon: ClipboardList },
      { to: "/admin/finance", label: "Faturalar", description: "Ödeme ve cari", icon: FileText },
      { to: "/admin/accounts", label: "Cari Hesap", description: "Resmi / iç kayıt", icon: Wallet },
      { to: "/admin/expenses", label: "Masraflar", description: "Gider kalemleri", icon: Receipt },
      { to: "/admin/reports", label: "Raporlar", description: "Analitik ve CSV", icon: BarChart3 },
    ],
  },
  {
    title: "Sistem",
    items: [{ to: "/admin/settings", label: "Ayarlar", description: "Firma ve CRM", icon: Settings }],
  },
];

const pageMeta = [
  { path: "/admin/customers", title: "Müşteriler", group: "CRM" },
  { path: "/admin/leads", title: "Fırsatlar", group: "CRM" },
  { path: "/admin/services", title: "Hizmetler", group: "CRM" },
  { path: "/admin/projects", title: "Projeler", group: "Operasyon" },
  { path: "/admin/tasks", title: "Görevler", group: "Operasyon" },
  { path: "/admin/tickets", title: "Destek Talepleri", group: "Operasyon" },
  { path: "/admin/offers", title: "Teklifler", group: "Finans" },
  { path: "/admin/finance", title: "Faturalar", group: "Finans" },
  { path: "/admin/accounts", title: "Cari Hesap", group: "Finans" },
  { path: "/admin/expenses", title: "Masraflar", group: "Finans" },
  { path: "/admin/reports", title: "Raporlar", group: "Finans" },
  { path: "/admin/messages", title: "Mesajlar", group: "Operasyon" },
  { path: "/admin/settings", title: "Ayarlar", group: "Sistem" },
  { path: "/admin", title: "Dashboard", group: "Genel", exact: true },
];

function currentPage(pathname: string) {
  return pageMeta.find((item) => (item.exact ? pathname === item.path : pathname.startsWith(item.path))) ?? { title: "Yönetim Paneli", group: "Eclipse CRM" };
}

export default function AdminLayout() {
  const { session, isAdmin, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const page = useMemo(() => currentPage(location.pathname), [location.pathname]);

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-secondary/40 text-sm text-muted-foreground">Yönetim paneli yükleniyor...</div>;
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  async function logout() {
    await supabase?.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-secondary/40">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-navy text-white shadow-2xl transition-transform duration-200 lg:static lg:w-80 lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="border-b border-white/10 p-5">
          <Link to="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logoDark} alt="Eclipse Mühendislik" className="h-14 w-24 object-contain" />
            <div className="min-w-0">
              <div className="font-display text-lg font-semibold">Eclipse CRM</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Yönetim Paneli</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{group.title}</div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-white/10 hover:text-white",
                          isActive ? "bg-electric text-white shadow-glow" : "text-white/75",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{item.label}</span>
                        <span className="block truncate text-[11px] opacity-65">{item.description}</span>
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white">
              <Home className="h-4 w-4" />
              Ana Siteye Dön
            </Link>
          </div>
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="mb-3 rounded-lg bg-white/5 p-3">
            <div className="text-xs text-white/50">Oturum</div>
            <div className="mt-1 truncate text-sm font-semibold">{session.user.email}</div>
          </div>
          <Button onClick={logout} variant="ghost" className="w-full justify-start text-white/75 hover:bg-white/10 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </aside>

      {open && <button className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-label="Menüyü kapat" />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex h-16 items-center gap-3">
            <button onClick={() => setOpen(true)} aria-label="Menüyü aç" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground">{page.group}</div>
              <div className="truncate font-display text-lg font-semibold">{page.title}</div>
            </div>
            <Button asChild size="sm" className="ml-auto hidden bg-gradient-electric text-white shadow-glow md:inline-flex">
              <Link to="/admin/customers">
                <Plus className="h-4 w-4" />
                Hızlı Kayıt
              </Link>
            </Button>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-4 md:p-6 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
