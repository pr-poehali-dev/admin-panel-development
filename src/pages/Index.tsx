import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const mockApplications = [
  { id: 1, client: 'Иванов Иван', email: 'ivanov@mail.ru', tour: 'Тайланд, Пхукет', date: '15.11.2025', status: 'new', amount: '120 000 ₽' },
  { id: 2, client: 'Петрова Анна', email: 'petrova@gmail.com', tour: 'Египет, Шарм-эль-Шейх', date: '14.11.2025', status: 'processing', amount: '85 000 ₽' },
  { id: 3, client: 'Сидоров Петр', email: 'sidorov@yandex.ru', tour: 'ОАЭ, Дубай', date: '13.11.2025', status: 'confirmed', amount: '200 000 ₽' },
  { id: 4, client: 'Козлова Мария', email: 'kozlova@mail.ru', tour: 'Турция, Анталия', date: '12.11.2025', status: 'new', amount: '65 000 ₽' },
  { id: 5, client: 'Морозов Алексей', email: 'morozov@gmail.com', tour: 'Мальдивы', date: '11.11.2025', status: 'processing', amount: '350 000 ₽' },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    new: { label: 'Новая', variant: 'default' },
    processing: { label: 'В обработке', variant: 'secondary' },
    confirmed: { label: 'Подтверждена', variant: 'outline' },
  };
  const statusData = variants[status] || variants.new;
  return <Badge variant={statusData.variant}>{statusData.label}</Badge>;
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('applications');

  const stats = [
    { title: 'Новые заявки', value: '12', change: '+3', icon: 'FileText', color: 'from-purple-500 to-purple-700' },
    { title: 'Активные туры', value: '156', change: '+8', icon: 'Plane', color: 'from-violet-500 to-violet-700' },
    { title: 'Клиенты', value: '10,342', change: '+124', icon: 'Users', color: 'from-indigo-500 to-indigo-700' },
    { title: 'Доход (месяц)', value: '2.4М ₽', change: '+18%', icon: 'TrendingUp', color: 'from-blue-500 to-blue-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#1A1F2C] to-[#2A1F3C]">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#241F2C] border-r border-[#7E69AB]/20 p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] flex items-center justify-center">
              <Icon name="Globe" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Вокруг света</h1>
              <p className="text-xs text-gray-400">Админ-панель</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'applications', label: 'Заявки', icon: 'FileText' },
              { id: 'tours', label: 'Туры', icon: 'Plane' },
              { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
              { id: 'settings', label: 'Настройки', icon: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white shadow-lg'
                    : 'text-gray-400 hover:bg-[#2A2F3C] hover:text-white'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Панель управления</h2>
              <p className="text-gray-400">Информационная система турагентства</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gradient-to-br from-[#2A2F3C] to-[#1A1F2C] border-[#7E69AB]/20 hover:border-[#9b87f5]/40 transition-all duration-300 hover:scale-105">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon name={stat.icon} size={20} className="text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <Icon name="TrendingUp" size={12} />
                      {stat.change} за неделю
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="applications" className="space-y-6">
                <Card className="bg-gradient-to-br from-[#2A2F3C] to-[#1A1F2C] border-[#7E69AB]/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">Заявки пользователей</CardTitle>
                        <CardDescription className="text-gray-400">Список всех поступивших заявок на туры</CardDescription>
                      </div>
                      <Button className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8a76e4] hover:to-[#6d58a0]">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Новая заявка
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#7E69AB]/20 hover:bg-[#2A2F3C]/50">
                          <TableHead className="text-gray-300">Клиент</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Тур</TableHead>
                          <TableHead className="text-gray-300">Дата</TableHead>
                          <TableHead className="text-gray-300">Сумма</TableHead>
                          <TableHead className="text-gray-300">Статус</TableHead>
                          <TableHead className="text-gray-300 text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockApplications.map((app) => (
                          <TableRow key={app.id} className="border-[#7E69AB]/20 hover:bg-[#2A2F3C]/50 transition-colors">
                            <TableCell className="font-medium text-white">{app.client}</TableCell>
                            <TableCell className="text-gray-400">{app.email}</TableCell>
                            <TableCell className="text-gray-300">{app.tour}</TableCell>
                            <TableCell className="text-gray-400">{app.date}</TableCell>
                            <TableCell className="text-white font-semibold">{app.amount}</TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2A2F3C]">
                                  <Icon name="Eye" size={16} />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2A2F3C]">
                                  <Icon name="Edit" size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tours" className="space-y-6">
                <Card className="bg-gradient-to-br from-[#2A2F3C] to-[#1A1F2C] border-[#7E69AB]/20">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Каталог туров</CardTitle>
                    <CardDescription className="text-gray-400">Управление турами и направлениями (150+ стран)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Icon name="Plane" size={48} className="mx-auto mb-4 text-[#9b87f5]" />
                      <p className="text-gray-400">Раздел в разработке</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <Card className="bg-gradient-to-br from-[#2A2F3C] to-[#1A1F2C] border-[#7E69AB]/20">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Статистика и аналитика</CardTitle>
                    <CardDescription className="text-gray-400">Отчеты по бронированиям и продажам</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-[#9b87f5]" />
                      <p className="text-gray-400">Раздел в разработке</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-gradient-to-br from-[#2A2F3C] to-[#1A1F2C] border-[#7E69AB]/20">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Настройки системы</CardTitle>
                    <CardDescription className="text-gray-400">Конфигурация параметров</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Icon name="Settings" size={48} className="mx-auto mb-4 text-[#9b87f5]" />
                      <p className="text-gray-400">Раздел в разработке</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
