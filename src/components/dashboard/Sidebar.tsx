'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Package
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Products', icon: Package, href: '/dashboard/products' },
  { name: 'Orders', icon: ShoppingBag, href: '/dashboard/orders' },
  { name: 'Customers', icon: Users, href: '/dashboard/customers' },
  { name: 'Analytics', icon: TrendingUp, href: '/dashboard/analytics' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col relative z-[100]"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-black tracking-tighter"
          >
            TAKEBOOST
          </motion.span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 group transition-all cursor-pointer">
              <item.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
              {!isCollapsed && (
                <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-500/10 group transition-all cursor-pointer">
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          {!isCollapsed && (
            <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
              Logout
            </span>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
