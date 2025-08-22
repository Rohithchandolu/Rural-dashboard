import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, CloudRain, Sprout, TrendingUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CsvReportWidget } from "@/components/csv-report-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-serif font-bold text-foreground">Rural Development Dashboard</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/insights" className="text-muted-foreground hover:text-foreground transition-colors">
                Insights
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Crops & Weather
            <span className="block text-primary">Analytics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive analytics dashboard for researchers and students studying rural development, crop production
            trends, and weather patterns across regions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/insights">
                <TrendingUp className="mr-2 h-5 w-5" />
                AI Insights
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Crop Production Analytics</h3>
              <p className="text-muted-foreground">
                Interactive charts showing crop production trends, state-wise comparisons, and seasonal patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloudRain className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Weather & Agriculture</h3>
              <p className="text-muted-foreground">
                Correlation analysis between weather conditions and crop yields with temperature and rainfall data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Machine learning generated insights and predictions based on historical crop and weather data.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CSV Report Generator Widget */}
        <div className="mb-16">
          <CsvReportWidget />
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-lg p-8 border">
          <h3 className="text-2xl font-serif font-bold text-center mb-8">Dashboard Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Crop Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">28</div>
              <div className="text-muted-foreground">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">10+</div>
              <div className="text-muted-foreground">Years of Data</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-chart-1 mb-2">AI</div>
              <div className="text-muted-foreground">Powered Insights</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>Rural Development Analytics Dashboard - Built for researchers and students</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
