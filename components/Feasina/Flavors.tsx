import { getStorefrontCatalog } from "@/lib/data/catalog";
import { getFlavourTheme } from "@/lib/flavor-theme";
import { FlavorCard } from "./FlavorCard";

export default async function Flavors() {
  const catalog = await getStorefrontCatalog();
  const bestsellers = catalog.filter((f) => f.isBestseller);
  const others = catalog.filter((f) => !f.isBestseller);

  return (
    <section id="flavours" className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our Irresistible Flavors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From tropical paradise to refreshing citrus bursts, each flavor is
            crafted to transport you to summer bliss with every sip
          </p>
        </div>

        {/* Bestsellers */}
        {bestsellers.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              🌟 Customer Favorites
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {bestsellers.map((flavour) => (
                <FlavorCard key={flavour.id} flavour={flavour} theme={getFlavourTheme(flavour.slug)} />
              ))}
            </div>
          </div>
        )}

        {/* Other Flavors */}
        {others.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800">
              More Exciting Options
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {others.map((flavour) => (
                <FlavorCard key={flavour.id} flavour={flavour} theme={getFlavourTheme(flavour.slug)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
