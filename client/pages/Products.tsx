import { useState } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  MapPin,
  Scissors,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample products data
const products = [
  {
    id: 1,
    name: 'Royal Kanjivaram Silk Saree',
    price: 45000,
    originalPrice: 50000,
    weaver: 'Lakshmi Devi',
    location: 'Kanchipuram, Tamil Nadu',
    variety: 'Kanjivaram',
    material: 'Pure Silk',
    color: 'Deep Maroon',
    design: 'Traditional Motifs',
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    featured: true,
    discount: 10,
  },
  {
    id: 2,
    name: 'Handwoven Banarasi Silk',
    price: 32000,
    weaver: 'Rajesh Kumar',
    location: 'Varanasi, Uttar Pradesh',
    variety: 'Banarasi',
    material: 'Pure Silk',
    color: 'Royal Blue',
    design: 'Zari Work',
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    featured: false,
  },
  {
    id: 3,
    name: 'Elegant Chanderi Cotton',
    price: 8500,
    weaver: 'Meera Sharma',
    location: 'Chanderi, Madhya Pradesh',
    variety: 'Chanderi',
    material: 'Cotton Silk',
    color: 'Sage Green',
    design: 'Floral Patterns',
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 32,
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Classic Tussar Silk Saree',
    price: 15000,
    weaver: 'Priya Patil',
    location: 'Bhagalpur, Bihar',
    variety: 'Tussar',
    material: 'Tussar Silk',
    color: 'Golden Yellow',
    design: 'Geometric Patterns',
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 28,
    inStock: false,
    featured: false,
  },
  {
    id: 5,
    name: 'Soft Cotton Handloom',
    price: 3500,
    weaver: 'Anjali Das',
    location: 'Pochampally, Telangana',
    variety: 'Pochampally',
    material: 'Cotton',
    color: 'Sky Blue',
    design: 'Ikat Patterns',
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 19,
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: 'Premium Maheshwari Silk',
    price: 12000,
    weaver: 'Sunita Verma',
    location: 'Maheshwar, Madhya Pradesh',
    variety: 'Maheshwari',
    material: 'Silk Cotton',
    color: 'Wine Red',
    design: 'Checks & Stripes',
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 41,
    inStock: true,
    featured: true,
  },
];

const filterOptions = {
  varieties: ['Kanjivaram', 'Banarasi', 'Chanderi', 'Tussar', 'Pochampally', 'Maheshwari'],
  materials: ['Pure Silk', 'Cotton Silk', 'Cotton', 'Tussar Silk', 'Silk Cotton'],
  colors: ['Deep Maroon', 'Royal Blue', 'Sage Green', 'Golden Yellow', 'Sky Blue', 'Wine Red', 'Black', 'White', 'Pink', 'Orange'],
  designs: ['Traditional Motifs', 'Zari Work', 'Floral Patterns', 'Geometric Patterns', 'Ikat Patterns', 'Checks & Stripes'],
};

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

interface Filters {
  varieties: string[];
  materials: string[];
  colors: string[];
  designs: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  featuredOnly: boolean;
  minRating: number;
}

const ProductCard = ({ product, viewMode }: { product: typeof products[0]; viewMode: ViewMode }) => {
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-48 h-48 bg-silk relative overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-destructive text-white">
                {product.discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Scissors className="h-4 w-4 mr-1" />
                    {product.weaver}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {product.rating} ({product.reviews} reviews)
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{product.variety}</Badge>
                  <Badge variant="secondary">{product.material}</Badge>
                  <Badge variant="secondary">{product.color}</Badge>
                  <Badge variant="secondary">{product.design}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-square bg-silk relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <Badge className="bg-gold text-white">Featured</Badge>
          )}
          {product.discount && (
            <Badge className="bg-destructive text-white">
              {product.discount}% OFF
            </Badge>
          )}
        </div>
        <Badge className="absolute top-2 right-2 bg-emerald text-white">
          <Star className="h-3 w-3 mr-1" />
          {product.rating}
        </Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-lg">Out of Stock</Badge>
          </div>
        )}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="space-y-1 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Scissors className="h-3 w-3 mr-1" />
            {product.weaver}
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {product.location}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">{product.variety}</Badge>
          <Badge variant="outline" className="text-xs">{product.material}</Badge>
        </div>
        <Button className="w-full" disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
};

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h4 className="font-medium">{title}</h4>
    {children}
  </div>
);

export default function Products() {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    varieties: [],
    materials: [],
    colors: [],
    designs: [],
    priceRange: [0, 100000],
    inStockOnly: false,
    featuredOnly: false,
    minRating: 0,
  });

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxFilter = (category: 'varieties' | 'materials' | 'colors' | 'designs', value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      varieties: [],
      materials: [],
      colors: [],
      designs: [],
      priceRange: [0, 100000],
      inStockOnly: false,
      featuredOnly: false,
      minRating: 0,
    });
  };

  const filteredProducts = products.filter(product => {
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.weaver.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filters.varieties.length && !filters.varieties.includes(product.variety)) return false;
    if (filters.materials.length && !filters.materials.includes(product.material)) return false;
    if (filters.colors.length && !filters.colors.includes(product.color)) return false;
    if (filters.designs.length && !filters.designs.includes(product.design)) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    if (filters.featuredOnly && !product.featured) return false;
    if (product.rating < filters.minRating) return false;
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <FilterSection title="Price Range">
        <div className="space-y-3">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange('priceRange', value)}
            max={100000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Varieties">
        <div className="space-y-2">
          {filterOptions.varieties.map((variety) => (
            <div key={variety} className="flex items-center space-x-2">
              <Checkbox
                id={`variety-${variety}`}
                checked={filters.varieties.includes(variety)}
                onCheckedChange={() => handleCheckboxFilter('varieties', variety)}
              />
              <Label htmlFor={`variety-${variety}`} className="text-sm">
                {variety}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Materials">
        <div className="space-y-2">
          {filterOptions.materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={filters.materials.includes(material)}
                onCheckedChange={() => handleCheckboxFilter('materials', material)}
              />
              <Label htmlFor={`material-${material}`} className="text-sm">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <div className="space-y-2">
          {filterOptions.colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => handleCheckboxFilter('colors', color)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Designs">
        <div className="space-y-2">
          {filterOptions.designs.map((design) => (
            <div key={design} className="flex items-center space-x-2">
              <Checkbox
                id={`design-${design}`}
                checked={filters.designs.includes(design)}
                onCheckedChange={() => handleCheckboxFilter('designs', design)}
              />
              <Label htmlFor={`design-${design}`} className="text-sm">
                {design}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Other Filters">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) => handleFilterChange('inStockOnly', checked)}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featuredOnly}
              onCheckedChange={(checked) => handleFilterChange('featuredOnly', checked)}
            />
            <Label htmlFor="featured" className="text-sm">
              Featured Only
            </Label>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Minimum Rating</Label>
            <Select value={filters.minRating.toString()} onValueChange={(value) => handleFilterChange('minRating', Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.8">4.8+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <Layout userRole={userRole}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Sarees</h1>
          
          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sarees, weavers, or locations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Mobile filter button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Filter products by your preferences
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 overflow-auto">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>
            
            {sortedProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No products found</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
              </Card>
            ) : (
              <div className={cn(
                'gap-6',
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'space-y-4'
              )}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
