"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GameStats } from "@/lib/types";

interface GameStatsProps {
  stats: GameStats;
}

export function GameStats({ stats }: GameStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.accuracy.toFixed(1)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">WPM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(stats.wpm)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTime.toFixed(1)}s</div>
        </CardContent>
      </Card>
    </div>
  );
}