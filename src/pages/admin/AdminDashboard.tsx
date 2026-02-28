import { useAuth } from '@/lib/auth';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Users, ShoppingCart, Award, Building2, UserCheck, LayoutDashboard, FileText, Shield, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', label: '總覽', icon: LayoutDashboard, exact: true },
  { path: '/admin/users', label: '用戶管理', icon: Users },
  { path: '/admin/orders', label: '訂單管理', icon: ShoppingCart },
  { path: '/admin/badges', label: '徽章管理', icon: Award },
  { path: '/admin/posts', label: '文章管理', icon: FileText },
  { path: '/admin/media', label: '媒體庫', icon: ImageIcon },
  { path: '/admin/companies', label: '公司管理', icon: Building2 },
  { path: '/admin/agents', label: '代理管理', icon: UserCheck },
  { path: '/admin/roles', label: '角色管理', icon: Shield },
];

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return <Navigate to="/mobile/login" replace />;

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 hidden md:block">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-foreground">ESG-Travel 後台</h1>
          <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(item => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-3 border-t border-border">
          <Link to="/site" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            ← 返回前台
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border p-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {navItems.map(item => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 mt-14 md:mt-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
