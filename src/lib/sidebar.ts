type SidebarItem = {
  title: string;
  url: string;
  active: boolean;
};

export type SidebarData = {
  title: string;
  url: string;
  items: SidebarItem[];
};

export const mainSidebarItems: SidebarData[] = [
  {
    title: 'Rosters',
    url: '#',
    items: [
      {
        title: 'Events',
        url: '/home/events',
        active: true,
      },
      {
        title: 'Teams',
        url: '/home/teams',
        active: false,
      },
      {
        title: 'Players',
        url: '/home/players',
        active: false,
      },
    ],
  },
  {
    title: 'Stats',
    url: '#',
    items: [
      {
        title: 'Series',
        url: '/home/series',
        active: false,
      },
      {
        title: 'Games',
        url: '/admin/games',
        active: false,
      },
    ],
  },
  {
    title: 'Administration',
    url: '#',
    items: [
      {
        title: 'Users',
        url: '/admin/user',
        active: false,
      },
      {
        title: 'Dennys Settings',
        url: '/admin/user',
        active: false,
      },
    ],
  },
];
