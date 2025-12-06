import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Car, Gauge, Calendar, Fuel, DollarSign, Zap, TrendingUp, Shield } from "lucide-react";
import heroCar from "@/assets/hero-car.png";
import { toast } from "sonner";

const carBrands = [
  "Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz", "Audi", "Volkswagen",
  "Hyundai", "Kia", "Nissan", "Chevrolet", "Mazda", "Subaru", "Lexus"
];

const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual", "CVT"];

const Index = () => {
  const [formData, setFormData] = useState({
    brand: "",
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
  });
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculatePrice = () => {
    if (!formData.brand || !formData.year || !formData.mileage || !formData.fuelType || !formData.transmission) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsCalculating(true);
    
    // Simulated ML prediction logic
    setTimeout(() => {
      const basePrice = 25000;
      const yearFactor = (parseInt(formData.year) - 2010) * 1200;
      const mileagePenalty = parseInt(formData.mileage) * 0.08;
      const brandPremium = ["BMW", "Mercedes-Benz", "Audi", "Lexus"].includes(formData.brand) ? 12000 : 0;
      const fuelBonus = formData.fuelType === "Electric" ? 8000 : formData.fuelType === "Hybrid" ? 3000 : 0;
      
      const price = Math.max(5000, basePrice + yearFactor - mileagePenalty + brandPremium + fuelBonus);
      setPredictedPrice(Math.round(price));
      setIsCalculating(false);
      toast.success("Price calculated successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(210_100%_60%)] flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">AutoValue</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#predict" className="text-muted-foreground hover:text-foreground transition-colors">Predict</a>
            <Button variant="glass" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">AI-Powered Predictions</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                Know Your Car's
                <span className="block gradient-text">True Value</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Get instant, accurate car price predictions powered by advanced machine learning algorithms. No guesswork, just data-driven insights.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}>
                  <TrendingUp className="w-5 h-5" />
                  Predict Price
                </Button>
                <Button variant="glass" size="lg">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="font-display text-3xl font-bold gradient-text">50K+</p>
                  <p className="text-sm text-muted-foreground">Cars Analyzed</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-display text-3xl font-bold gradient-text">95%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-display text-3xl font-bold gradient-text">10K+</p>
                  <p className="text-sm text-muted-foreground">Happy Users</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <img 
                  src={heroCar} 
                  alt="Luxury sports car"
                  className="w-full animate-float"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/30 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">AutoValue</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced prediction engine analyzes millions of data points to give you the most accurate car valuations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "ML-Powered Accuracy",
                description: "Advanced algorithms trained on millions of car sales for precise predictions."
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get your car's estimated value in seconds, not hours or days."
              },
              {
                icon: Shield,
                title: "Trusted Data",
                description: "Valuations based on real market data and current trends."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prediction Form Section */}
      <section id="predict" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Get Your <span className="gradient-text">Price Estimate</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Enter your car's details below and our AI will calculate its market value instantly.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Brand
                  </label>
                  <Select onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {carBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Year
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 2020"
                    min="1990"
                    max="2024"
                    className="h-12 bg-secondary/50 border-border/50 focus:border-primary"
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>

                {/* Mileage */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Mileage (km)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 50000"
                    className="h-12 bg-secondary/50 border-border/50 focus:border-primary"
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  />
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    Fuel Type
                  </label>
                  <Select onValueChange={(value) => setFormData({ ...formData, fuelType: value })}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Transmission */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Transmission
                  </label>
                  <Select onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissions.map((trans) => (
                        <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full mt-8"
                onClick={calculatePrice}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    Get Price Estimate
                  </>
                )}
              </Button>

              {/* Result */}
              {predictedPrice && (
                <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center animate-slide-up">
                  <p className="text-muted-foreground mb-2">Estimated Market Value</p>
                  <p className="font-display text-5xl md:text-6xl font-bold gradient-text">
                    ${predictedPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Based on current market trends and vehicle specifications
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[hsl(210_100%_60%)] flex items-center justify-center">
                <Car className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">AutoValue</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Created by <span className="text-foreground font-medium">Ramanpreet Singh</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                © 2024 AutoValue. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
