"use client";

import { useAnalytics } from "@/src/features/analytics/hooks/useAnalytics";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Alert, AlertDescription } from "@/src/shared/components/ui/alert";
import { Button } from "@/src/shared/components/ui/button";
import { StatCardsSkeleton, CardSkeleton } from "@/src/shared/components/ui/skeletons";
import {
  AlertCircle,
  RefreshCw,
  Users,
  Fingerprint,
  ShieldCheck,
  KeyRound,
  Clock,
  Layers,
  Activity,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/shared/components/ui/chart";

const PIE_COLORS = [
  "var(--color-primary)",
  "var(--color-chart-3)",
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-muted-foreground)",
];

export function DashboardContent() {
  const { data, isLoading, error, refetch } = useAnalytics();
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48">
          <div className="h-full w-full animate-pulse rounded bg-muted" />
        </div>
        <StatCardsSkeleton count={9} />
        <div className="grid gap-6 lg:grid-cols-2">
          <CardSkeleton height="h-80" />
          <CardSkeleton height="h-80" />
          <CardSkeleton height="h-80" />
          <CardSkeleton height="h-80" />
          <CardSkeleton height="h-80" />
          <CardSkeleton height="h-80" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("dashboard.error")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("dashboard.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("dashboard.subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`size-2.5 rounded-full ${data.kratosHealth ? "bg-green-500" : "bg-destructive"}`}
            />
            <span className="text-xs text-muted-foreground">
              {t("dashboard.stats.kratosHealth")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`size-2.5 rounded-full ${data.hydraHealth ? "bg-green-500" : "bg-destructive"}`}
            />
            <span className="text-xs text-muted-foreground">
              {t("dashboard.stats.hydraHealth")}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="size-4 mr-1" />
            {t("dashboard.refresh")}
          </Button>
        </div>
      </div>

      {!data.hydraHealth && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertDescription>{t("dashboard.hydraUnavailable")}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.totalUsers}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.totalUsers")}</p>
              <p className="text-xs text-muted-foreground/70">
                {t("dashboard.stats.newUsers30d", { n: data.newUsers30d })}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Fingerprint className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.activeSessions}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.activeSessions")}</p>
              <p className="text-xs text-muted-foreground/70">
                {t("dashboard.stats.sessions7d", { n: data.sessions7d })}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.verificationRate}%</p>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.stats.emailVerification")}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <KeyRound className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.totalClients}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.oauthClients")}</p>
              <p className="text-xs text-muted-foreground/70">
                {t("dashboard.stats.clientTypes", {
                  public: data.publicClients,
                  confidential: data.confidentialClients,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.avgSessionDuration}m</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.avgSession")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Layers className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.identitySchemas}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.schemas")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Activity className="size-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {data.kratosHealth ? t("dashboard.health.ok") : t("dashboard.health.down")}
                </p>
                <div
                  className={`size-2.5 rounded-full ${data.kratosHealth ? "bg-green-500" : "bg-destructive"}`}
                />
              </div>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.kratosHealth")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Activity className="size-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {data.hydraHealth ? t("dashboard.health.ok") : t("dashboard.health.down")}
                </p>
                <div
                  className={`size-2.5 rounded-full ${data.hydraHealth ? "bg-green-500" : "bg-destructive"}`}
                />
              </div>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.hydraHealth")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ListChecks className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{data.grantTypes.length}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.stats.grantTypes")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.charts.newUsers")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: t("dashboard.charts.newUsers") } }} className="h-64">
              <LineChart accessibilityLayer data={data.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.charts.usersBySchema")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <PieChart>
                <Pie
                  data={data.usersBySchema}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {data.usersBySchema.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.charts.sessionActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: t("dashboard.charts.sessionActivity") } }} className="h-64">
              <LineChart accessibilityLayer data={data.sessionActivity}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.charts.clientTypes")}</CardTitle>
          </CardHeader>
          <CardContent>
            {data.clientTypes.every((d) => d.value === 0) ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <KeyRound className="size-6" />
                </div>
                <p className="text-sm font-medium">{t("dashboard.empty.noClients")}</p>
                <p className="text-xs text-muted-foreground/60 mt-1 text-center max-w-xs">
                  {t("dashboard.empty.noClientsHint")}
                </p>
              </div>
            ) : (
              <ChartContainer config={{}} className="h-64">
                <PieChart>
                  <Pie
                    data={data.clientTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.clientTypes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.charts.emailVerification")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <PieChart>
                <Pie
                  data={data.verificationGauge}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {data.verificationGauge.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{t("dashboard.charts.grantTypes")}</CardTitle>
          </CardHeader>
          <CardContent>
            {data.grantTypes.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <ListChecks className="size-6" />
                </div>
                <p className="text-sm font-medium">{t("dashboard.empty.noClients")}</p>
                <p className="text-xs text-muted-foreground/60 mt-1 text-center max-w-xs">
                  {t("dashboard.empty.noGrants")}
                </p>
              </div>
            ) : (
              <ChartContainer config={{}} className="h-64">
                <PieChart>
                  <Pie
                    data={data.grantTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.grantTypes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
