'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Sparkles, FlaskConical } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Accueil - Cartes V1',
      icon: Home,
      description: 'Version avec HTML généré par GPT-5'
    },
    {
      href: '/cards-v2',
      label: 'Cartes V2',
      icon: Layers,
      description: 'Version avec formatage côté client'
    }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                🍁 Quebec Teacher Hub v4
              </span>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2
                      ${isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Environnement de développement
            </span>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Sparkles className="h-3 w-3 mr-1" />
                GPT-5 Actif
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <FlaskConical className="h-3 w-3 mr-1" />
                Expérimental
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}